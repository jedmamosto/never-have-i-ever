import { ImageResponse } from "next/og";

const size = {
  width: 1080,
  height: 1920,
};

export async function GET() {
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
            "radial-gradient(#dbc1ba 2.5px, transparent 2.5px)",
          backgroundSize: "32px 32px",
          padding: "44px",
        }}
      >
        {/* Main Neo-Brutalist Story Card */}
        <div
          style={{
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
          }}
        >
          {/* Section 1: Header Chips */}
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
                backgroundColor: "#fec24a",
                border: "4px solid #1c1c19",
                borderRadius: "14px",
                boxShadow: "5px 5px 0px #1c1c19",
                padding: "12px 24px",
                fontSize: "20px",
                fontWeight: 900,
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
                backgroundColor: "#ffdbd2",
                border: "4px solid #1c1c19",
                borderRadius: "14px",
                boxShadow: "5px 5px 0px #1c1c19",
                padding: "12px 24px",
                fontSize: "20px",
                fontWeight: 900,
                color: "#3c0800",
              }}
            >
              <span>600 CARDS · 10 LEVELS</span>
            </div>
          </div>

          {/* Section 2: Headline & Cultural Punchline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "18px",
              }}
            >
              <span
                style={{
                  fontSize: "96px",
                  fontWeight: 900,
                  color: "#1c1c19",
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                }}
              >
                Tagay Ta
              </span>
              <div
                style={{
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
                }}
              >
                FREE WEB APP
              </div>
            </div>

            <div
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#9a442d",
                marginTop: "12px",
                lineHeight: 1.2,
              }}
            >
              “Walang uuwi hangga’t may natitirang amats!”
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#55423e",
                marginTop: "8px",
              }}
            >
              Pinoy Barkada Inuman &amp; Party Deck
            </div>
          </div>

          {/* Section 3: Intensity Matrix Showcase */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f0ede9",
              border: "4px solid #1c1c19",
              borderRadius: "20px",
              boxShadow: "6px 6px 0px #1c1c19",
              padding: "20px 24px",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "17px",
                  fontWeight: 900,
                  color: "#7c5800",
                  letterSpacing: "0.06em",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#7c5800"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>10 INTENSITY LEVELS — ZERO BORING ICEBREAKERS</span>
              </div>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#55423e",
                }}
              >
                Swipe to adjust heat
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              {[
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
              ].map((item) => (
                <div
                  key={item.lvl}
                  style={{
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
                  }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 900 }}>
                    L{item.lvl}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Centerpiece Prompt Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              border: "5px solid #1c1c19",
              borderRadius: "24px",
              boxShadow: "10px 10px 0px #1c1c19",
              padding: "36px 36px",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#9a442d",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 900,
                    padding: "6px 14px",
                    borderRadius: "8px",
                    letterSpacing: "0.05em",
                    border: "2px solid #1c1c19",
                  }}
                >
                  NEVER HAVE I EVER · LEVEL 4
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "17px",
                    fontWeight: 800,
                    color: "#7c5800",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="#7c5800"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                  <span>SPICY BARKADA LORE</span>
                </div>
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "#88726d",
                }}
              >
                CARD #184 / 500
              </div>
            </div>

            <div
              style={{
                fontSize: "36px",
                fontWeight: 800,
                color: "#1c1c19",
                lineHeight: 1.3,
                marginTop: "6px",
                marginBottom: "6px",
              }}
            >
              “Umiyak sa banyo habang ongoing yung inuman sa labas.”
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "3px dashed #dbc1ba",
                paddingTop: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#9a442d",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#9a442d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
                  <path d="M5 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z" />
                  <path d="M9 10v7" />
                  <path d="M13 10v7" />
                </svg>
                <span>KUNG NAGAWA MO NA:</span>
                <span
                  style={{
                    backgroundColor: "#ffdbd2",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    border: "2px solid #1c1c19",
                    color: "#3c0800",
                  }}
                >
                  SHOT KA MUNA!
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#44664b",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#44664b",
                  }}
                />
                <span>Pass & Play Verified</span>
              </div>
            </div>
          </div>

          {/* Section 5: Feature Highlights Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "14px",
            }}
          >
            {[
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#1c1c19"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
                    <path d="M5 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z" />
                    <path d="M9 10v7" />
                    <path d="M13 10v7" />
                  </svg>
                ),
                title: "100% Inuman Ready",
                desc: "Pass-and-play phone friendly",
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#1c1c19"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                title: "No App Install",
                desc: "Runs instant in any browser",
              },
              {
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#1c1c19"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "Zero Sign-up",
                desc: "100% free, walang login",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  backgroundColor: "#f0ede9",
                  border: "3px solid #1c1c19",
                  borderRadius: "14px",
                  boxShadow: "4px 4px 0px #1c1c19",
                  padding: "16px 14px",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {feat.icon}
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#1c1c19",
                    }}
                  >
                    {feat.title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#55423e",
                  }}
                >
                  {feat.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Section 6: Massive CTA Banner */}
          <div
            style={{
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
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "18px",
                fontWeight: 900,
                color: "#715000",
                letterSpacing: "0.08em",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#715000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <span>MAGLARO KASAMA ANG BARKADA NGAYON</span>
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="#715000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
            </div>

            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#1c1c19",
                letterSpacing: "-0.03em",
              }}
            >
              tagay-ta.vercel.app
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#31302d",
              }}
            >
              Open in Safari, Chrome, or Instagram browser — Tap & Pass!
            </div>
          </div>

          {/* Section 7: Footer Bar & Creator Signature */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingTop: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "18px",
                fontWeight: 700,
                color: "#55423e",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: "#44664b",
                  border: "2px solid #1c1c19",
                }}
              />
              <span>tagay-ta.vercel.app</span>
            </div>

            <div
              style={{
                fontSize: "19px",
                fontWeight: 800,
                color: "#1c1c19",
              }}
            >
              Created by Jed Mamosto
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
