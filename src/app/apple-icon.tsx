import { ImageResponse } from 'next/og';

export const runtime = 'edge';
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
        <span style={{ fontSize: '72px' }}>🍻</span>
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
