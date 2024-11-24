// src/app/page.tsx
import apiRoute from '@/api/routes';
import { redirect } from 'next/navigation';

// Mark this function as async
export default async function Home() {
  // Fetch data server-side
  const response = await fetch(apiRoute.auth.roleRoute, {
    method: 'GET',
    cache: 'no-store' // Optional: Avoid using cached data
  });

  // If the response is not ok, trigger a server-side redirect
  if (!response.ok) {
    redirect('/auth'); // Server-side redirect
  }

  // If everything is okay, proceed to render the page
  return (
    <div>
      <h1>Welcome to the homepage</h1>
      <p>If you see this, redirection did not occur.</p>
    </div>
  );
}
