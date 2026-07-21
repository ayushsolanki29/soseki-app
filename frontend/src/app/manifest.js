export default function manifest() {
  return {
    name: 'Soseki - All-in-one business operating platform',
    short_name: 'Soseki',
    description: 'The open-source platform for freelancers and agencies to magically simplify business operations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B68F5',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
