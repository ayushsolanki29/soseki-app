import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Soseki - Free Invoicing & CRM for Freelancers';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function Image() {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://soseki.app';
  
  const bannerUrl = `${baseUrl}/banner-og.jpeg`;
  const logoUrl = `${baseUrl}/logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background Image */}
        <img
          src={bannerUrl}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Content Container (Bottom Glass Card) */}
        <div
          style={{
            position: 'absolute',
            left: '40px',
            right: '40px',
            bottom: '40px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 48px',
          }}
        >
          {/* Left Side: Logo and Text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img 
                src={logoUrl} 
                width={48} 
                height={48} 
                style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
              />
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Soseki
              </h1>
            </div>

            <h2
              style={{
                fontSize: '40px',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 12px 0',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: '700px',
              }}
            >
              Run your freelance business without five different tools.
            </h2>
            
            <p
              style={{
                fontSize: '24px',
                fontWeight: 500,
                color: '#475569',
                margin: 0,
              }}
            >
              Clients, projects, invoices, and expenses, all in one workspace.
            </p>
          </div>
          
          {/* Right Side: CTA Pill */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                background: '#09090b',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '24px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
              }}
            >
              soseki.app
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
