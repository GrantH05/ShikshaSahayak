'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageToggle from '../../../components/LanguageToggle';
import { useLanguage } from '../../lib/language-context';

const translations = {
  en: {
    dashboard: 'Teacher Dashboard',
    assistant: 'Simple Teaching Assistant',
    dashboardNav: 'Dashboard',
    chatNav: 'AI Chat',
    historyNav: 'History',
    profileNav: 'Profile',
    logout: 'Logout'
  },
  hi: {
    dashboard: 'शिक्षक डैशबोर्ड',
    assistant: 'सरल शिक्षण सहायक',
    dashboardNav: 'डैशबोर्ड',
    chatNav: 'AI चैट',
    historyNav: 'इतिहास',
    profileNav: 'प्रोफाइल',
    logout: 'लॉगआउट'
  }
};

interface TProfile {
  name: string;
  email: string;
  role: string;
  school: string;
  joined: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const [profile, setProfile] = useState<TProfile | " ">(" ");
  const [loading, setLoading] = useState(true);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

   useEffect(() => {
    const fProfile = async () => {
      try {
        setLoading(true);

        // ✅ CALL YOUR EXISTING getUserFromToken API
        const response = await fetch('/api/auth/me');

        const data = await response.json();
        
        if (data.user) {
          setProfile({
            name: data.user.name || data.user.email.split('@')[0],
            email: data.user.email,
            role: capitalize(data.user.role) || 'Teacher',
            school: data.user.school || 'Govt Primary School',
            joined: data.user.joined
          });
          console.log(profile.name);
        } else {
          setError('User not found');
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/login';
        }
      } catch (err: any) {
        setError('Failed to load profile');
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fProfile();
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f8fafc',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ fontSize: '2rem', color: '#64748b' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex' 
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '80px',
        background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        transition: 'all 0.3s ease',
        height: '100vh',
        position: 'fixed',
        zIndex: 100,
        overflow: 'hidden',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
      }}>
        {/* Profile Section */}
        <div style={{ 
          padding: '2rem 1.5rem', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', 
          alignItems: 'center', 
          gap: sidebarOpen ? '1rem' : '0'
        }}>
          <div style={{
            width: '50px', height: '50px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 'bold',
            flexShrink: 0
          }}>
            👨‍🏫
          </div>
          {sidebarOpen && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {profile.name}
              </div>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{profile.role}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/dashboard" style={navStyle(true)}>📊 {sidebarOpen && t.dashboardNav}</Link>
          <Link href="/dashboard/chat" style={navStyle()}>💬 {sidebarOpen && t.chatNav}</Link>
          <Link href="/dashboard/history" style={navStyle()}>📚 {sidebarOpen && t.historyNav}</Link>
          <Link href="/dashboard/profile" style={navStyle()}>👤 {sidebarOpen && t.profileNav}</Link>
        </nav>

        {/* Sidebar Toggle */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer', padding: '0.75rem',
          background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s'
        }} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? 'Collapse' : 'Expand'}
        >
          {sidebarOpen ? '◀️' : '▶️'}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '280px' : '80px',
        flex: 1,
        padding: '2rem',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'white',
          padding: '1.5rem 2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: '2rem',
          zIndex: 50
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#1e293b',
              margin: 0
            }}>
              {t.dashboard}
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageToggle />
            <button 
              onClick={() => {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.href = '/login';
              }}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                borderRadius: '1rem',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(239,68,68,0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(239,68,68,0.3)';
              }}
            >
              🚪 {t.logout}
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ 
          background: 'white', 
          borderRadius: '1.5rem', 
          padding: '2rem', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          minHeight: '60vh'
        }}>
          {children}
        </div>
      </div>

      <style jsx>{`
        a:hover {
          background: rgba(255,255,255,0.15) !important;
          transform: translateX(4px) !important;
        }
      `}</style>
    </div>
  );
}

function navStyle(active = false) {
  return {
    padding: '1.25rem 1.5rem',
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    fontWeight: active ? '700' : '500',
    fontSize: '1.05rem',
    transition: 'all 0.2s ease',
    borderRadius: '0 1rem 1rem 0',
    margin: '0 0.5rem',
    position: 'relative'
  };
}

