import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/resultados')({
  beforeLoad: () => { throw redirect({ to: '/' }); },
  head: () => ({ meta: [{ title: 'Archivo retirado — Roast Room' }, { name: 'description', content: 'La encuesta fue reemplazada por Roast Room.' }, { property: 'og:title', content: 'Archivo retirado — Roast Room' }, { property: 'og:description', content: 'Entrá a la nueva sala de roasts.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }),
});
