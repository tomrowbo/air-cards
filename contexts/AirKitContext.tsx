'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AirService, BUILD_ENV } from '@mocanetwork/airkit';

interface User {
  uuid: string;
  email?: string;
  walletAddress?: string;
  metadata?: any;
}

interface AirKitContextType {
  airService: AirService | null;
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AirKitContext = createContext<AirKitContextType | undefined>(undefined);

export function AirKitProvider({ children }: { children: ReactNode }) {
  const [airService, setAirService] = useState<AirService | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAirKit = async () => {
      try {
        const service = new AirService({
          partnerId: process.env.NEXT_PUBLIC_PARTNER_ID || '66d238a8-3ab6-4734-98b2-79ccf0cc30a2'
        });

        // Initialize the service with proper parameters
        await service.init({
          buildEnv: BUILD_ENV.SANDBOX,
          enableLogging: true,
          skipRehydration: false
        });

        setAirService(service);

        console.log('AIR Kit service created successfully');
      } catch (error) {
        console.error('Failed to initialize AIR Kit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAirKit();
  }, []);

  const login = async () => {
    if (!airService) {
      throw new Error('AIR Kit service not initialized');
    }

    try {
      setIsLoading(true);
      const loginResult = await airService.login();

      // Handle the login result based on the actual API response
      // For now, we'll create a mock user until we know the exact structure
      if (loginResult) {
        setUser({
          uuid: (loginResult as any).uuid || 'air-user-' + Date.now(),
          email: (loginResult as any).email,
          walletAddress: (loginResult as any).walletAddress || (loginResult as any).address,
          metadata: (loginResult as any).metadata || {},
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!airService) return;

    try {
      setIsLoading(true);
      await airService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AirKitContext.Provider
      value={{
        airService,
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AirKitContext.Provider>
  );
}

export function useAirKit() {
  const context = useContext(AirKitContext);
  if (context === undefined) {
    throw new Error('useAirKit must be used within an AirKitProvider');
  }
  return context;
}