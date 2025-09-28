'use client';

import { AtmosphericBackground } from '@/components/AtmosphericBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAirKit } from '@/contexts/AirKitContext';
import { motion } from 'framer-motion';
import {
  CreditCard,
  ExternalLink,
  Gift,
  ShoppingBag,
  Percent,
  Trophy,
  LogOut,
  Wallet
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAirKit();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const stats = [
    {
      icon: <Trophy className="w-5 h-5" />,
      label: 'Member Since',
      value: new Date().toLocaleDateString(),
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: 'Card Status',
      value: 'Active',
      status: 'success',
    },
    {
      icon: <Gift className="w-5 h-5" />,
      label: 'Perks Available',
      value: '12',
    },
    {
      icon: <Percent className="w-5 h-5" />,
      label: 'Total Savings',
      value: '$0',
    },
  ];

  const quickActions = [
    {
      title: 'AIR Shop',
      description: 'Browse exclusive member products',
      icon: <ShoppingBag className="w-6 h-6" />,
      href: process.env.NEXT_PUBLIC_AIR_SHOP_URL || 'https://air.shop',
      external: true,
    },
    {
      title: 'View Card',
      description: 'Open in your digital wallet',
      icon: <CreditCard className="w-6 h-6" />,
      action: () => {
        // This would typically open the wallet app
        alert('Open your digital wallet app to view your AIR Card');
      },
    },
    {
      title: 'Explore Perks',
      description: 'Discover available benefits',
      icon: <Gift className="w-6 h-6" />,
      href: `${process.env.NEXT_PUBLIC_AIR_SHOP_URL || 'https://air.shop'}/perks`,
      external: true,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AtmosphericBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="mb-4">
              <Image
                src="/air-logo.svg"
                alt="AIR Cards"
                width={120}
                height={48}
                className="mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {user && (
            <Card className="glass-card border-white/10 mb-8">
              <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>
                  {user.email || user.walletAddress || `Member ${user.uuid.slice(0, 8)}...`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        {stat.icon}
                        <span className="text-xs">{stat.label}</span>
                      </div>
                      <p className={`text-xl font-semibold ${
                        stat.status === 'success' ? 'text-green-400' : 'text-white'
                      }`}>
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {action.href ? (
                  <Card
                    className="glass-card border-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      if (action.external) {
                        window.open(action.href, '_blank');
                      } else {
                        router.push(action.href);
                      }
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-blue-400 group-hover:scale-110 transition-transform">
                          {action.icon}
                        </div>
                        {action.external && (
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  <Card
                    className="glass-card border-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
                    onClick={action.action}
                  >
                    <CardHeader>
                      <div className="text-blue-400 group-hover:scale-110 transition-transform">
                        {action.icon}
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle>Your AIR Card Benefits</CardTitle>
              <CardDescription>
                Make the most of your membership
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <div>
                  <h4 className="font-medium text-white">NFC Tap-to-Pay</h4>
                  <p className="text-sm text-gray-400">
                    Use your phone to instantly redeem perks at partner locations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2"></div>
                <div>
                  <h4 className="font-medium text-white">Exclusive Access</h4>
                  <p className="text-sm text-gray-400">
                    Get early access to new products and special events
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2"></div>
                <div>
                  <h4 className="font-medium text-white">Member Discounts</h4>
                  <p className="text-sm text-gray-400">
                    Save up to 30% on purchases at AIR Shop
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}