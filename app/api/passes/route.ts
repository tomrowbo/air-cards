import { NextRequest, NextResponse } from 'next/server';

interface PassEntryConfig {
  apiKey: string;
  templateId: string;
  apiUrl: string;
}

interface PassData {
  externalId: string;
  email?: string;
  walletAddress?: string;
  metadata?: Record<string, any>;
}

interface PassResponse {
  id: string;
  url: string;
  nfcEnabled: boolean;
  externalId: string;
  createdAt: string;
}

class PassEntryService {
  private config: PassEntryConfig;

  constructor(config: PassEntryConfig) {
    this.config = config;
  }

  async createOrGetPass(data: PassData): Promise<PassResponse> {
    try {
      // First, try to get existing pass
      const existingPass = await this.getPassByExternalId(data.externalId);
      if (existingPass) {
        return existingPass;
      }

      // If no existing pass, create new one
      return await this.createPass(data);
    } catch (error) {
      console.error('Error creating/getting pass:', error);
      throw error;
    }
  }

  private async getPassByExternalId(externalId: string): Promise<PassResponse | null> {
    try {
      const url = `${this.config.apiUrl}/passes/${encodeURIComponent(externalId)}`;
      console.log('Attempting to get pass from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      console.log('Get pass response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          console.log('Pass not found, will create new one');
          return null;
        }
        const errorText = await response.text();
        console.error('Get pass error:', errorText);
        throw new Error(`Failed to get pass: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Found existing pass:', responseData);

      const passData = responseData.data;
      return {
        id: passData.id,
        url: passData.attributes.downloadUrl,
        nfcEnabled: !!passData.attributes.nfc,
        externalId: passData.attributes.extId,
        createdAt: passData.attributes.createdAt
      };
    } catch (error) {
      console.error('Error fetching pass:', error);
      return null;
    }
  }

  private async createPass(data: PassData): Promise<PassResponse> {
    const passPayload = {
      extId: data.externalId,
      pass: {
        nfc: {
          enabled: true,
          source: 'extId'
        },
        barcode: {
          enabled: true,
          type: 'qr',
          source: 'extId',
          displayText: true
        },
        // Template-specific fields - only email if provided
        ...(data.email && { email: { value: data.email } })
      }
    };

    const createUrl = `${this.config.apiUrl}/passes?passTemplate=${this.config.templateId}`;
    console.log('Creating pass at URL:', createUrl);
    console.log('Create pass payload:', JSON.stringify(passPayload, null, 2));

    const response = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passPayload),
    });

    console.log('Create pass response status:', response.status);

    if (!response.ok) {
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = 'Unable to read error response';
      }
      console.error('PassEntry create pass error:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: createUrl,
        payload: passPayload
      });
      throw new Error(`Failed to create pass: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Create pass success:', responseData);

    const passData = responseData.data;
    return {
      id: passData.id,
      url: passData.attributes.downloadUrl,
      nfcEnabled: !!passData.attributes.nfc,
      externalId: passData.attributes.extId,
      createdAt: passData.attributes.createdAt
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const config = {
      apiKey: process.env.PASSENTRY_API_KEY!,
      templateId: process.env.PASSENTRY_TEMPLATE_ID!,
      apiUrl: process.env.PASSENTRY_API_URL!,
    };

    if (!config.apiKey || !config.templateId || !config.apiUrl) {
      return NextResponse.json(
        { error: 'PassEntry configuration missing' },
        { status: 500 }
      );
    }

    const passEntryService = new PassEntryService(config);
    const body = await request.json();

    const { externalId, email, walletAddress, metadata } = body;

    if (!externalId) {
      return NextResponse.json(
        { error: 'External ID is required' },
        { status: 400 }
      );
    }

    const passResponse = await passEntryService.createOrGetPass({
      externalId,
      email,
      walletAddress,
      metadata,
    });

    return NextResponse.json(passResponse);
  } catch (error) {
    console.error('Pass creation API error:', error);
    return NextResponse.json(
      { error: 'Failed to create or retrieve pass' },
      { status: 500 }
    );
  }
}