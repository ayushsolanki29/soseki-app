import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Soseki - All-in-one business operating platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const features = [
  {
    label: 'Open Source',
    bgColor: '#f1f5f9',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    )
  },
  {
    label: 'Zero Middleman Fees',
    bgColor: '#f1f5f9',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    )
  },
  {
    label: 'Multi-Currency',
    bgColor: '#f1f5f9',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    )
  },
  {
    label: 'Client Portal',
    bgColor: '#f1f5f9',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    )
  }
];

const audiences = [
  {
    label: 'Freelancers',
    bgColor: 'white',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    )
  },
  {
    label: 'Consultants',
    bgColor: 'white',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    )
  },
  {
    label: 'Small Agencies',
    bgColor: 'white',
    color: '#0f172a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
    )
  }
];

export default async function Image() {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://soseki.app';
  
  const logoUrl = `${baseUrl}/logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '12px solid #f8fafc',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            width: '100%',
            height: '100%',
            padding: '40px 80px',
          }}
        >
          {/* Header Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img 
              src={logoUrl} 
              width={100} 
              height={100} 
              alt="Soseki Logo" 
              style={{ borderRadius: '20px', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }} 
            />
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: '#0f172a',
                margin: '24px 0 12px 0',
                letterSpacing: '-0.03em',
              }}
            >
              Soseki
            </h1>
            <p
              style={{
                fontSize: '28px',
                fontWeight: 500,
                color: '#475569',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              The all-in-one business operating platform.
            </p>
          </div>

          {/* Details Section (Features & Audience) */}
          <div style={{ display: 'flex', gap: '48px', marginTop: '40px', width: '100%', justifyContent: 'center' }}>
            
            {/* Features Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, alignItems: 'flex-end' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', marginRight: '4px' }}>
                Main USPs
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-end', maxWidth: '480px' }}>
                {features.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: item.bgColor,
                      color: item.color,
                      padding: '10px 20px',
                      borderRadius: '100px',
                      fontSize: '20px',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      border: `1px solid ${item.color}20`,
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Divider */}
            <div style={{ width: '2px', background: '#e2e8f0', borderRadius: '1px' }} />

            {/* Target Audience Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, alignItems: 'flex-start' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '4px' }}>
                Built For
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-start', maxWidth: '480px' }}>
                {audiences.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: item.bgColor,
                      color: item.color,
                      padding: '10px 20px',
                      borderRadius: '100px',
                      fontSize: '20px',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      border: `1px solid ${item.color}20`,
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
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
