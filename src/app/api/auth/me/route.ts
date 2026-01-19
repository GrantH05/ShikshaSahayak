import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserFromToken } from '../../../../lib/auth';

export async function GET() {
  try {
    // ✅ FIXED: async cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const user = token ? await getUserFromToken(token) : null;
    
    if (!user) {
      return NextResponse.json({ user: null });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}

