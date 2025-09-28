'use client';

import { AtmosphericBackground } from '@/components/AtmosphericBackground';
import { Button } from '@/components/ui/button';
import { useAirKit } from '@/contexts/AirKitContext';
import { CreditCard, Sparkles, Shield, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';

export default function HomePage() {
  const { login, isAuthenticated, isLoading } = useAirKit();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login();
      router.push('/claim');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/claim');
    }
  }, [isAuthenticated, router]);

  const features = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'NFC-Enabled Cards',
      description: 'Tap your phone at partner locations for instant rewards and exclusive access',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Exclusive Perks',
      description: 'Access special discounts, early releases, and member-only experiences',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your credentials are protected with blockchain security on MOCA Chain',
    },
  ];

  return (
    <div className="min-h-screen">
      <AtmosphericBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/air-logo.svg"
              alt="AIR Cards"
              width={200}
              height={80}
              className="mx-auto"
              priority
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <CreditCard className="mr-3 w-6 h-6" />
                Claim Your Card
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          <p className="text-sm text-gray-300 mt-6">
            Free to claim • Add to Apple & Google Wallet • Instant NFC access
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Why Choose AIR Cards?
            </h3>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Experience the future of digital membership with blockchain-powered security and real-world utility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/60 hover:border-blue-200 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">
            Get Started in 3 Steps
          </h3>
          <p className="text-xl text-gray-200 mb-20 max-w-2xl mx-auto">
            Join thousands of users who have already claimed their AIR Cards
          </p>

          <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-400/50 via-indigo-400/50 to-purple-400/50"></div>

            {/* Step 1 */}
            <div className="group relative text-center">
              <div className="relative z-10 space-y-8">
                <div className="relative mx-auto w-32 h-32">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  {/* Number circle */}
                  <div className="relative w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">Connect Wallet</h4>
                  <p className="text-gray-300 leading-relaxed max-w-xs mx-auto">
                    Use your AIR credentials to securely authenticate and verify your identity
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative text-center">
              <div className="relative z-10 space-y-8">
                <div className="relative mx-auto w-32 h-32">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  {/* Number circle */}
                  <div className="relative w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">Claim Your Card</h4>
                  <p className="text-gray-300 leading-relaxed max-w-xs mx-auto">
                    Generate your NFC-enabled digital membership card with exclusive benefits
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative text-center">
              <div className="relative z-10 space-y-8">
                <div className="relative mx-auto w-32 h-32">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  {/* Number circle */}
                  <div className="relative w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">Start Using</h4>
                  <p className="text-gray-300 leading-relaxed max-w-xs mx-auto">
                    Add to your wallet and tap to unlock exclusive perks at partner locations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Connecting...' : 'Claim Your Card'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 text-center">
        <p className="text-white text-sm">
          Powered by MOCA Chain • Secured by AIR Kit • Enabled by PassEntry
        </p>
      </footer>
    </div>
  );
}
