'use client'; 

export default function Dashboard() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '2rem',
      padding: '3rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '1rem'
        }}>
          स्वागत है, शिक्षक!
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b' }}>
          AI शिक्षक सहायक से कक्षा को रोचक बनाएं
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {/* ✅ FIXED: Correct href paths */}
        <a href="/dashboard/chat" style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
          transition: 'all 0.3s',
          height: '200px',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }} onMouseOver={(e: any) => {
          e.target.style.transform = 'translateY(-8px)';
          e.target.style.boxShadow = '0 30px 60px rgba(59, 130, 246, 0.4)';
        }} onMouseOut={(e: any) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            AI चैट
          </h2>
          <p>तुरंत शिक्षण सुझाव पाएं</p>
        </a>

        <a href="/dashboard/history" style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.3s',
          height: '200px',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }} onMouseOver={(e: any) => {
          e.target.style.transform = 'translateY(-8px)';
          e.target.style.boxShadow = '0 30px 60px rgba(16, 185, 129, 0.4)';
        }} onMouseOut={(e: any) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            चैट इतिहास
          </h2>
          <p>पिछली बातचीत देखें</p>
        </a>
      </div>
    </div>
  );
}

