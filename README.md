# AIR Cards

A Next.js application for claiming and managing AIR digital membership cards with NFC capabilities, built on MOCA Chain using AIR Kit and PassEntry.

## Features

- **AIR Credentials Authentication**: Secure login using AIR Kit for wallet-based authentication
- **Digital Membership Cards**: NFC-enabled passes that work with Apple Wallet and Google Wallet
- **Cloud-themed UI**: Modern fintech design with atmospheric gradients and animations
- **PassEntry Integration**: Secure pass creation and management
- **MOCA Chain Support**: Built for the MOCA Chain testnet ecosystem

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom glass morphism effects
- **Animations**: Framer Motion for smooth transitions
- **Authentication**: AIR Kit (@mocanetwork/airkit)
- **Pass Management**: PassEntry API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

1. Partner ID from [AIR Kit Developer Dashboard](https://developers.sandbox.air3.com/)
2. PassEntry API credentials
3. Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your credentials:
```env
# AIR Kit Configuration
NEXT_PUBLIC_PARTNER_ID=your_partner_id_here
NEXT_PUBLIC_AIR_ENV=sandbox

# PassEntry Configuration
NEXT_PUBLIC_PASSENTRY_API_KEY=your_passentry_api_key_here
NEXT_PUBLIC_PASSENTRY_TEMPLATE_ID=your_pass_template_id_here
NEXT_PUBLIC_PASSENTRY_API_URL=https://api.passentry.com/v1

# Moca Network
NEXT_PUBLIC_MOCA_CHAIN_ID=5151
NEXT_PUBLIC_MOCA_RPC_URL=https://testnet-rpc.mechain.tech
NEXT_PUBLIC_AIR_SHOP_URL=https://air.shop
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add the environment variables from `.env.example` to your Vercel project settings
4. Deploy!

The application is ready for production deployment with optimized builds and static generation.

## Key Features

### Authentication Flow
1. Users connect with AIR Credentials on the landing page
2. Authentication is handled through the AIR Kit SDK
3. Session management with automatic redirect on login/logout

### Card Claiming Process
1. Authenticated users can claim their AIR Card
2. PassEntry API creates an NFC-enabled digital pass
3. Users can add the pass to their digital wallet
4. External ID uses wallet address or email for uniqueness

### Benefits & Perks
- Exclusive discounts at AIR Shop
- NFC tap-to-redeem functionality
- Community event access
- Early access to new features

## Environment Configuration

Copy `.env.example` to `.env.local` and configure with your API keys and settings before deploying to Vercel.
