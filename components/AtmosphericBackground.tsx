'use client';

export function AtmosphericBackground() {
  return (
    <>
      {/* Direct body background style */}
      <style jsx global>{`
        body {
          background-image: url(/background.png);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>

      {/* Fallback div */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </>
  );
}