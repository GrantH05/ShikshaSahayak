'use client';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user from our JWT API (no NextAuth)
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        window.location.href = '/login';
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-12 text-red-500">Please login again</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Name</label>
            <p className="text-2xl font-semibold text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
            <p className="text-xl text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Organization</label>
            <p className="text-xl font-semibold text-blue-600">{user.organization}</p>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">User ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{user.id}</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

