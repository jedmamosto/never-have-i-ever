import { ImageResponse } from "next/og";

export const alt = "Tagay Ta — Pinoy Barkada Party Deck & Tabletop Drinking Game";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0ede9",
          backgroundImage:
            "radial-gradient(#dbc1ba 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          padding: "36px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#fcf9f4",
            border: "4px solid #1c1c19",
            borderRadius: "24px",
            boxShadow: "14px 14px 0px #1c1c19",
            padding: "44px 52px",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#fec24a",
                border: "3px solid #1c1c19",
                borderRadius: "10px",
                boxShadow: "4px 4px 0px #1c1c19",
                padding: "8px 18px",
                fontSize: "17px",
                fontWeight: 800,
                color: "#1c1c19",
                letterSpacing: "0.04em",
              }}
            >
              <span>TAGAY TA // BARKADA PARTY DECK</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#ffdbd2",
                border: "3px solid #1c1c19",
                borderRadius: "10px",
                boxShadow: "4px 4px 0px #1c1c19",
                padding: "8px 18px",
                fontSize: "17px",
                fontWeight: 800,
                color: "#3c0800",
              }}
            >
              <span>500 CARDS · 10 LEVELS</span>
            </div>
          </div>

          {/* Hero Content Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "76px",
                  fontWeight: 900,
                  color: "#1c1c19",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                Tagay Ta
              </div>
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#55423e",
                  marginTop: "6px",
                }}
              >
                The Ultimate Pinoy Inuman, Party & Icebreaker Deck
              </div>
            </div>

            {/* Prompt Card Preview */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                border: "3px solid #1c1c19",
                borderRadius: "16px",
                boxShadow: "6px 6px 0px #1c1c19",
                padding: "20px 24px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#9a442d",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    letterSpacing: "0.05em",
                  }}
                >
                  NEVER HAVE I EVER · LEVEL 4
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#7c5800",
                  }}
                >
                  🌶️ SPICY BARKADA LORE
                </div>
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1c1c19",
                  lineHeight: 1.3,
                }}
              >
                “Umiyak sa banyo habang ongoing yung inuman sa labas.”
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "19px",
                fontWeight: 700,
                color: "#1c1c19",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#44664b",
                  border: "2px solid #1c1c19",
                }}
              />
              <span>tagay-ta.vercel.app</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f0ede9",
                  border: "2px solid #1c1c19",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1c1c19",
                }}
              >
                🍻 Inuman Ready
              </div>
              <div
                style={{
                  backgroundColor: "#f0ede9",
                  border: "2px solid #1c1c19",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1c1c19",
                }}
              >
                🌶️ 10 Intensity Levels
              </div>
              <div
                style={{
                  backgroundColor: "#f0ede9",
                  border: "2px solid #1c1c19",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1c1c19",
                }}
              >
                📱 Pass & Play
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
