import { ImageResponse } from 'next/og';

export const alt = 'Questionnaire';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }) {
  const slug = params?.slug;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  let title = 'Questionnaire';
  let description = 'Soseki - Free Invoicing & CRM for Freelancers';

  try {
    const res = await fetch(`${API_URL}/questionnaires/public/${slug}`, {
      next: { revalidate: 60 }
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.questionnaire) {
        title = data.questionnaire.title || title;
        description = data.questionnaire.description || description;
      }
    }
  } catch (err) {
    console.error("Failed to fetch questionnaire for og-image", err);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #ffffff, #f3f4f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'sans-serif',
          border: '16px solid #8b5cf6', // purple border matching Soseki theme
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '60px',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: '#111827',
              marginBottom: '20px',
              wordWrap: 'break-word',
              maxWidth: '800px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#4b5563',
              marginBottom: '40px',
              maxWidth: '800px',
              wordWrap: 'break-word',
            }}
          >
            {description.substring(0, 150)}{description.length > 150 ? '...' : ''}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Powered by Soseki
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
