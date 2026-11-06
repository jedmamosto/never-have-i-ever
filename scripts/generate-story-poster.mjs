import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import React from "react";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.resolve(projectRoot, "public/tagay-ta-story.png");

console.log("[generate-story-poster] Generating 1080x1920 Story Promotional Poster...");

const width = 1080;
const height = 1920;

const levels = [
  { lvl: "1", name: "Chill", bg: "#c5ecca", color: "#00210c" },
  { lvl: "2", name: "Light", bg: "#ffdea7", color: "#271900" },
  { lvl: "3", name: "Tampo", bg: "#fec24a", color: "#1c1c19" },
  { lvl: "4", name: "Spicy", bg: "#e07a5f", color: "#ffffff" },
  { lvl: "5", name: "Secret", bg: "#9a442d", color: "#ffffff" },
  { lvl: "6", name: "Exes", bg: "#9a442d", color: "#ffffff" },
  { lvl: "7", name: "Wild", bg: "#ba1a1a", color: "#ffffff" },
  { lvl: "8", name: "Savage", bg: "#93000a", color: "#ffffff" },
  { lvl: "9", name: "Liar", bg: "#5b1604", color: "#ffffff" },
  { lvl: "10", name: "Chaos", bg: "#1c1c19", color: "#fec24a" },
];

const features = [
  {
    icon: "🍻",
    title: "100% Inuman Ready",
    desc: "Pass-and-play phone friendly",
  },
  {
    icon: "⚡",
    title: "No App Install",
    desc: "Runs instant in any browser",
  },
  {
    icon: "🔒",
    title: "Zero Sign-up",
    desc: "100% free, walang login",
  },
];

const posterElement = React.createElement(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0ede9",
      backgroundImage: "radial-gradient(#dbc1ba 2.5px, transparent 2.5px)",
      backgroundSize: "32px 32px",
      padding: "44px",
    },
  },
  React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fcf9f4",
        border: "6px solid #1c1c19",
        borderRadius: "32px",
        boxShadow: "18px 18px 0px #1c1c19",
        padding: "52px 48px",
      },
    },
    // Top Bar
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fec24a",
            border: "4px solid #1c1c19",
            borderRadius: "14px",
            boxShadow: "5px 5px 0px #1c1c19",
            padding: "12px 24px",
            fontSize: "20px",
            fontWeight: 900,
            color: "#1c1c19",
            letterSpacing: "0.04em",
          },
        },
        "TAGAY TA // BARKADA PARTY DECK"
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffdbd2",
            border: "4px solid #1c1c19",
            borderRadius: "14px",
            boxShadow: "5px 5px 0px #1c1c19",
            padding: "12px 24px",
            fontSize: "20px",
            fontWeight: 900,
            color: "#3c0800",
          },
        },
        "500 CARDS · 10 LEVELS"
      )
    ),

    // Headline & Tagline
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          marginTop: "8px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "baseline",
            gap: "18px",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "96px",
              fontWeight: 900,
              color: "#1c1c19",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            },
          },
          "Tagay Ta"
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              backgroundColor: "#9a442d",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 800,
              padding: "6px 16px",
              borderRadius: "8px",
              border: "3px solid #1c1c19",
              boxShadow: "3px 3px 0px #1c1c19",
              letterSpacing: "0.06em",
            },
          },
          "FREE WEB APP"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "32px",
            fontWeight: 800,
            color: "#9a442d",
            marginTop: "12px",
            lineHeight: 1.2,
          },
        },
        "“Walang uuwi hangga’t may natitirang amats!”"
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "24px",
            fontWeight: 600,
            color: "#55423e",
            marginTop: "8px",
          },
        },
        "The Ultimate Pinoy Inuman, Icebreaker & Party Deck"
      )
    ),

    // Intensity Grid
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f0ede9",
          border: "4px solid #1c1c19",
          borderRadius: "20px",
          boxShadow: "6px 6px 0px #1c1c19",
          padding: "20px 24px",
          gap: "12px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "17px",
              fontWeight: 900,
              color: "#7c5800",
              letterSpacing: "0.06em",
            },
          },
          "⚡ 10 INTENSITY LEVELS — ZERO BORING ICEBREAKERS"
        ),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "15px",
              fontWeight: 700,
              color: "#55423e",
            },
          },
          "Swipe to adjust heat"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
          },
        },
        ...levels.map((item) =>
          React.createElement(
            "div",
            {
              key: item.lvl,
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                backgroundColor: item.bg,
                color: item.color,
                border: "3px solid #1c1c19",
                borderRadius: "10px",
                padding: "8px 4px",
                gap: "2px",
              },
            },
            React.createElement(
              "span",
              { style: { fontSize: "16px", fontWeight: 900 } },
              `L${item.lvl}`
            ),
            React.createElement(
              "span",
              {
                style: {
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                },
              },
              item.name
            )
          )
        )
      )
    ),

    // Centerpiece Prompt Card
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          border: "5px solid #1c1c19",
          borderRadius: "24px",
          boxShadow: "10px 10px 0px #1c1c19",
          padding: "36px 36px",
          gap: "20px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                backgroundColor: "#9a442d",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 900,
                padding: "6px 14px",
                borderRadius: "8px",
                letterSpacing: "0.05em",
                border: "2px solid #1c1c19",
              },
            },
            "NEVER HAVE I EVER · LEVEL 4"
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: "17px",
                fontWeight: 800,
                color: "#7c5800",
              },
            },
            "🌶️ SPICY BARKADA LORE"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: "16px",
              fontWeight: 800,
              color: "#88726d",
            },
          },
          "CARD #184 / 500"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "36px",
            fontWeight: 800,
            color: "#1c1c19",
            lineHeight: 1.3,
            marginTop: "6px",
            marginBottom: "6px",
          },
        },
        "“Umiyak sa banyo habang ongoing yung inuman sa labas.”"
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px dashed #dbc1ba",
            paddingTop: "18px",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              fontWeight: 800,
              color: "#9a442d",
            },
          },
          React.createElement("span", null, "🍺 KUNG NAGAWA MO NA:"),
          React.createElement(
            "span",
            {
              style: {
                backgroundColor: "#ffdbd2",
                padding: "4px 12px",
                borderRadius: "6px",
                border: "2px solid #1c1c19",
                color: "#3c0800",
              },
            },
            "SHOT KA MUNA!"
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "17px",
              fontWeight: 700,
              color: "#44664b",
            },
          },
          React.createElement("div", {
            style: {
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#44664b",
            },
          }),
          React.createElement("span", null, "Pass & Play Verified")
        )
      )
    ),

    // Feature Highlights Bar
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          gap: "14px",
        },
      },
      ...features.map((feat) =>
        React.createElement(
          "div",
          {
            key: feat.title,
            style: {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              backgroundColor: "#f0ede9",
              border: "3px solid #1c1c19",
              borderRadius: "14px",
              boxShadow: "4px 4px 0px #1c1c19",
              padding: "16px 14px",
              gap: "4px",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
              },
            },
            React.createElement("span", { style: { fontSize: "20px" } }, feat.icon),
            React.createElement(
              "span",
              {
                style: {
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#1c1c19",
                },
              },
              feat.title
            )
          ),
          React.createElement(
            "span",
            {
              style: {
                fontSize: "14px",
                fontWeight: 600,
                color: "#55423e",
              },
            },
            feat.desc
          )
        )
      )
    ),

    // Massive CTA Banner
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fec24a",
          border: "5px solid #1c1c19",
          borderRadius: "22px",
          boxShadow: "8px 8px 0px #1c1c19",
          padding: "26px 32px",
          gap: "8px",
          textAlign: "center",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: "18px",
            fontWeight: 900,
            color: "#715000",
            letterSpacing: "0.08em",
          },
        },
        "👉 MAGLARO KASAMA ANG BARKADA NGAYON 👈"
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "44px",
            fontWeight: 900,
            color: "#1c1c19",
            letterSpacing: "-0.03em",
          },
        },
        "tagay-ta.vercel.app"
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "18px",
            fontWeight: 700,
            color: "#31302d",
          },
        },
        "Open in Safari, Chrome, or Instagram browser — Tap & Pass!"
      )
    ),

    // Footer Bar & Creator Signature
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingTop: "6px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#55423e",
          },
        },
        React.createElement("div", {
          style: {
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: "#44664b",
            border: "2px solid #1c1c19",
          },
        }),
        React.createElement("span", null, "tagay-ta.vercel.app")
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "19px",
            fontWeight: 800,
            color: "#1c1c19",
          },
        },
        "Created by Jed Mamosto"
      )
    )
  )
);

try {
  const imageResponse = new ImageResponse(posterElement, {
    width,
    height,
  });

  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  console.log(`[generate-story-poster] SUCCESS: Story poster saved to ${outputPath}`);
  console.log(`[generate-story-poster] File size: ${(buffer.length / 1024).toFixed(2)} KB`);
  process.exit(0);
} catch (err) {
  console.error("[generate-story-poster] ERROR rendering poster:", err);
  process.exit(1);
}
