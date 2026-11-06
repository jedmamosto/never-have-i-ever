import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsPath = path.resolve(__dirname, '../src/data/questions.ts');

if (!fs.existsSync(questionsPath)) {
  console.error(`ERROR: Missing dataset file at ${questionsPath}`);
  process.exit(1);
}

const rawSource = fs.readFileSync(questionsPath, 'utf8');

// Strip TypeScript type-only imports and type annotations to evaluate pure data in Node VM
const executableSource = rawSource
  .replace(/^\s*import\s+type\s+[^\n]+\n/gm, '')
  .replace(/export\s+const\s+INITIAL_QUESTIONS\s*:\s*QuestionCard\[\]\s*=/, 'globalThis.INITIAL_QUESTIONS =');

const sandbox = { globalThis: {} };
vm.createContext(sandbox);
vm.runInContext(executableSource, sandbox, { filename: 'questions.ts' });

const questions = sandbox.globalThis.INITIAL_QUESTIONS;

const errors = [];

if (!Array.isArray(questions)) {
  console.error('ERROR: INITIAL_QUESTIONS is not an array.');
  process.exit(1);
}

// 1. Total count is strictly 500
if (questions.length !== 500) {
  errors.push(`Expected strictly 500 questions, found ${questions.length}.`);
}

const levelCounts = new Map();
for (let lvl = 1; lvl <= 10; lvl++) {
  levelCounts.set(lvl, 0);
}

const seenIds = new Set();
const seenTexts = new Set();

const expectedTierForLevel = (level) => {
  if (level >= 1 && level <= 3) return 'chill';
  if (level >= 4 && level <= 7) return 'party';
  if (level >= 8 && level <= 10) return 'spicy';
  return null;
};

questions.forEach((q, idx) => {
  const expectedId = `q-${String(idx + 1).padStart(3, '0')}`;

  // ID format and uniqueness
  if (typeof q.id !== 'string' || !/^q-\d{3}$/.test(q.id)) {
    errors.push(`Index ${idx}: Invalid id format "${q.id}" (expected "${expectedId}").`);
  }
  if (q.id !== expectedId) {
    errors.push(`Index ${idx}: Expected sequential id "${expectedId}", found "${q.id}".`);
  }
  if (seenIds.has(q.id)) {
    errors.push(`Duplicate id detected: "${q.id}".`);
  }
  seenIds.add(q.id);

  // Level distribution
  if (!Number.isInteger(q.level) || q.level < 1 || q.level > 10) {
    errors.push(`${q.id}: Invalid level "${q.level}" (must be integer 1..10).`);
  } else {
    levelCounts.set(q.level, (levelCounts.get(q.level) || 0) + 1);
  }

  // Tier mapping
  const expectedTier = expectedTierForLevel(q.level);
  if (q.tier !== expectedTier) {
    errors.push(`${q.id}: Level ${q.level} requires tier "${expectedTier}", found "${q.tier}".`);
  }

  // Category presence
  if (typeof q.category !== 'string' || q.category.trim().length === 0) {
    errors.push(`${q.id}: Missing or empty category.`);
  }

  // Text validation
  if (typeof q.text !== 'string') {
    errors.push(`${q.id}: Text is not a string.`);
    return;
  }

  const trimmed = q.text.trim();
  const normalized = trimmed.toLowerCase().replace(/\s+/g, ' ');

  if (seenTexts.has(normalized)) {
    errors.push(`${q.id}: Duplicate normalized text detected: "${trimmed}".`);
  }
  seenTexts.add(normalized);

  if (trimmed.length < 15 || trimmed.length > 68) {
    errors.push(
      `${q.id}: Text length ${trimmed.length} is outside [15, 68] chars: "${trimmed}"`
    );
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 3 || words.length > 12) {
    errors.push(
      `${q.id}: Word count ${words.length} is outside [3, 12] words: "${trimmed}"`
    );
  }

  if (/^never\s+have\s+i\s+ever\b/i.test(trimmed)) {
    errors.push(`${q.id}: Text must not start with "Never Have I Ever": "${trimmed}"`);
  }

  if (!/^[A-Z]/.test(trimmed)) {
    errors.push(`${q.id}: Text must start with a capital letter: "${trimmed}"`);
  }

  if (!/[.!?]["']?$/.test(trimmed)) {
    errors.push(`${q.id}: Text must end with terminal punctuation: "${trimmed}"`);
  }
});

// 2. Every level 1..10 has strictly 50 questions
for (let lvl = 1; lvl <= 10; lvl++) {
  const count = levelCounts.get(lvl) || 0;
  if (count !== 50) {
    errors.push(`Level ${lvl}: Expected strictly 50 questions, found ${count}.`);
  }
}

// 3. Semantic / fuzzy deduplication check (Jaccard >= 0.65 or Levenshtein >= 0.75)
function cleanWords(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
}

function jaccard(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

for (let i = 0; i < questions.length; i++) {
  const wordsA = new Set(cleanWords(questions[i].text));
  const normA = questions[i].text.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let j = i + 1; j < questions.length; j++) {
    const wordsB = new Set(cleanWords(questions[j].text));
    const normB = questions[j].text.toLowerCase().replace(/[^a-z0-9]/g, '');

    const jSim = jaccard(wordsA, wordsB);
    const maxLen = Math.max(normA.length, normB.length);
    const levDist = levenshtein(normA, normB);
    const levSim = 1 - (levDist / maxLen);

    if (jSim >= 0.65 || levSim >= 0.75) {
      errors.push(
        `Semantic near-duplicate detected between ${questions[i].id} and ${questions[j].id} (Jaccard: ${(jSim * 100).toFixed(0)}%, Lev: ${(levSim * 100).toFixed(0)}%):\n    "${questions[i].text}" vs "${questions[j].text}"`
      );
    }
  }
}

if (errors.length > 0) {
  console.error('DATASET VERIFICATION FAILED:');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log('DATASET VERIFICATION PASSED:');
console.log(`  - Total questions: ${questions.length}`);
console.log(`  - Unique IDs: ${seenIds.size} (q-001..q-500)`);
console.log(`  - Unique normalized prompts: ${seenTexts.size}`);
console.log('  - Semantic & exact deduplication (Jaccard < 0.65, Levenshtein < 0.75): 100% valid');
console.log(
  `  - Level distribution: ${Array.from(levelCounts.entries())
    .map(([lvl, c]) => `L${lvl}:${c}`)
    .join(', ')}`
);
console.log('  - Tier mapping (chill: L1-3, party: L4-7, spicy: L8-10): 100% valid');
console.log('  - Character bounds [15..68], word count [3..12], prefix rules, and punctuation: 100% valid');
process.exit(0);
