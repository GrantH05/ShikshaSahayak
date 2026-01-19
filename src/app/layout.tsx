import { cookies } from 'next/headers';
import { getUserFromToken } from '../lib/auth';
import LoginPage from './login/page';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Next.js 15+ async cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const user = token ? await getUserFromToken(token) : null;
  
  if (!user) {
    return (
      <html lang="en">
        <body>
          <LoginPage />
        </body>
      </html>
    );
  }
  
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}

