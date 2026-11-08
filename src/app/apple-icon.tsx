import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fec24a',
          border: '8px solid #1c1c19',
          borderRadius: '40px',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="76"
          height="76"
          fill="none"
        >
          <path
            d="M22 11h4a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4"
            stroke="#1c1c19"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#fec24a"
          />
          <rect
            x="5"
            y="9"
            width="17"
            height="18"
            rx="3"
            fill="#ffffff"
            stroke="#1c1c19"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 14v10M13 14v10M18 14v10"
            stroke="#1c1c19"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M4 9c0-2 1.5-3.5 3.5-3.5 1 0 1.8.4 2.5 1 .6-.8 1.6-1.5 2.8-1.5 1.4 0 2.5.8 3 2 .5-.3 1.1-.5 1.7-.5 2 0 3.5 1.5 3.5 3.5H4z"
            fill="#fcf9f4"
            stroke="#1c1c19"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="7.5" r="1" fill="#ffffff" />
          <circle cx="13" cy="6.5" r="1.2" fill="#ffffff" />
          <circle cx="17.5" cy="8" r="0.8" fill="#ffffff" />
        </svg>
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: '18px',
            fontWeight: 900,
            color: '#1c1c19',
            letterSpacing: '0.08em',
            marginTop: '4px',
            textTransform: 'uppercase',
          }}
        >
          TAGAY TA
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
