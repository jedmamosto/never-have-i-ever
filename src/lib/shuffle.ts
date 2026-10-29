/**
 * Generates a non-repeating shuffled order of card IDs using the Fisher-Yates algorithm.
 * If `avoidFirstId` is provided and `ids.length > 1`, guarantees that `shuffled[0] !== avoidFirstId`
 * by swapping index 0 with the last element so consecutive cycles never repeat at the boundary.
 */
export function createNonRepeatingOrder(ids: string[], avoidFirstId?: string): string[] {
  const shuffled = [...ids];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  if (shuffled.length > 1 && avoidFirstId && shuffled[0] === avoidFirstId) {
    const lastIndex = shuffled.length - 1;
    const temp = shuffled[0];
    shuffled[0] = shuffled[lastIndex];
    shuffled[lastIndex] = temp;
  }

  return shuffled;
}
