import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // In Next.js 15, params is a promise. We'll handle both just in case, but usually just params.slug works in 13/14.
  const slug = params?.slug;
  
  // Fetch questionnaire data for metadata
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  
  try {
    const res = await fetch(`${API_URL}/questionnaires/public/${slug}`, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    if (!res.ok) {
      return { title: 'Questionnaire | Soseki' };
    }
    
    const data = await res.json();
    const questionnaire = data.questionnaire;
    
    if (!questionnaire) return { title: 'Questionnaire | Soseki' };
    
    return {
      title: questionnaire.title,
      description: questionnaire.description || 'Please fill out this form to continue.',
      openGraph: {
        title: questionnaire.title,
        description: questionnaire.description || 'Please fill out this form to continue.',
        type: 'website',
      }
    };
  } catch (err) {
    return { title: 'Questionnaire | Soseki' };
  }
}

export default function QuestionnaireLayout({ children }) {
  return <>{children}</>;
}
