'use client';

export default function SimpleTest() {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f3f4f6' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '2rem' }}>
        Simple Style Test
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <button
          style={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.75rem',
            border: 'none',
            fontSize: '1.125rem',
            fontWeight: '600',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
        >
          Inline Styled Button
        </button>
      </div>

      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
          Inline Styled Card
        </h2>
        <p style={{ color: '#6b7280' }}>
          This uses inline styles instead of Tailwind to test if styling works at all.
        </p>
      </div>
    </div>
  );
}