'use client';

import { AtmosphericBackground } from '@/components/AtmosphericBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAirKit } from '@/contexts/AirKitContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  CheckCircle,
  Smartphone,
  ExternalLink,
  Gift,
  ShoppingBag,
  Percent,
  Users,
  Loader2,
  Wifi,
  Cloud
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClaimPage() {
  const { user, isAuthenticated, logout } = useAirKit();
  const router = useRouter();
  const [claimStatus, setClaimStatus] = useState<'idle' | 'claiming' | 'success' | 'error'>('idle');
  const [passUrl, setPassUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleClaimCard = async () => {
    if (!user) return;

    setClaimStatus('claiming');
    setErrorMessage('');

    try {
      // Create or get pass from server API
      const externalId = user.email || user.walletAddress || user.uuid;

      const response = await fetch('/api/passes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalId,
          email: user.email,
          walletAddress: user.walletAddress,
          metadata: {
            userId: user.uuid,
            claimedAt: new Date().toISOString(),
            network: 'MOCA Chain Testnet',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const passResponse = await response.json();

      // Open the pass URL directly in the browser
      if (passResponse.url) {
        window.open(passResponse.url, '_blank');
      }

      setPassUrl(passResponse.url);
      setClaimStatus('success');
    } catch (error) {
      console.error('Failed to claim card:', error);
      setErrorMessage('Failed to claim your AIR Card. Please try again.');
      setClaimStatus('error');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const benefits = [
    {
      icon: <Percent className="w-5 h-5" />,
      title: 'Exclusive Discounts',
      description: 'Up to 30% off at partner stores',
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Early Access',
      description: 'Be first to new drops and features',
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      title: 'AIR Shop Perks',
      description: 'Special member-only products',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Community Events',
      description: 'VIP access to AIR events',
    },
  ];

  const features = [
    {
      icon: <Wifi className="w-5 h-5" />,
      title: 'NFC Technology',
      description: 'Tap your phone at partner locations for instant redemption',
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Digital Wallet',
      description: 'Works with Apple Wallet and Google Wallet',
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      title: 'Cloud Backup',
      description: 'Your card is always recoverable through AIR Credentials',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AtmosphericBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-between mb-6">
            <Image
              src="/air-logo.svg"
              alt="AIR Cards"
              width={100}
              height={40}
            />
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Claim Your AIR Card</h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {claimStatus === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="glass-card border-white/10 mb-8">
                <CardContent className="pt-6">
                  <div className="text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <CreditCard className="w-10 h-10 text-white" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Your AIR Card Awaits</h2>
                      <p className="text-gray-300 max-w-md mx-auto">
                        Get instant access to exclusive perks, discounts, and member-only experiences across the AIR ecosystem.
                      </p>
                    </div>

                    <Button
                      onClick={handleClaimCard}
                      size="lg"
                      variant="gradient"
                      className="w-full max-w-sm mx-auto"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Claim My AIR Card
                    </Button>

                    <p className="text-sm text-gray-400">
                      Free to claim • Works with Apple & Google Wallet • Instant NFC access
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Information - Below the fold */}
              <div className="mt-16 space-y-8">
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="text-blue-400">{benefit.icon}</div>
                          <div>
                            <h4 className="font-semibold text-white text-sm">{benefit.title}</h4>
                            <p className="text-xs text-gray-400">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="text-indigo-400">{feature.icon}</div>
                          <div>
                            <h4 className="font-medium text-white text-sm">{feature.title}</h4>
                            <p className="text-xs text-gray-400">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {claimStatus === 'claiming' && (
            <motion.div
              key="claiming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">Creating Your AIR Card</h2>
              <p className="text-gray-400">This will just take a moment...</p>
            </motion.div>
          )}

          {claimStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="glass-card border-green-400/30 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-6 h-6" />
                    Success! Your AIR Card is Ready
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="glass-card rounded-lg p-6 text-center">
                    <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Add to Your Wallet
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Click the button below to add your AIR Card to Apple Wallet or Google Wallet
                    </p>
                    {passUrl && (
                      <Button
                        asChild
                        size="lg"
                        variant="gradient"
                        className="w-full sm:w-auto"
                      >
                        <a href={passUrl} target="_blank" rel="noopener noreferrer">
                          Add to Wallet
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <h3 className="font-semibold text-white mb-4">What's Next?</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-blue-400">1</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Open your digital wallet and find your new AIR Card
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-blue-400">2</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Visit AIR Shop to explore exclusive member perks
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-blue-400">3</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Tap your phone at partner locations to redeem benefits
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1"
                    >
                      <a
                        href={process.env.NEXT_PUBLIC_AIR_SHOP_URL || 'https://air.shop'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit AIR Shop
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      onClick={() => router.push('/dashboard')}
                      variant="secondary"
                      className="flex-1"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {claimStatus === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="glass-card border-red-400/30">
                <CardHeader>
                  <CardTitle className="text-red-400">Unable to Claim Card</CardTitle>
                  <CardDescription>{errorMessage}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleClaimCard} variant="outline" className="w-full">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}