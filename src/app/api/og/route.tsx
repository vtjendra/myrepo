import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'ClaimIt';
  const company = searchParams.get('company') || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eff6ff',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#2563eb',
              marginBottom: 20,
            }}
          >
            ClaimIt
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#111827',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {company && (
            <div
              style={{
                fontSize: 24,
                color: '#6b7280',
                marginTop: 16,
              }}
            >
              {company}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
