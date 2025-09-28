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
      const response = await fetch(
        `${this.config.apiUrl}/passes/${encodeURIComponent(externalId)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to get pass: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        id: data.id,
        url: data.url || data.passUrl,
        nfcEnabled: data.passContent?.nfc?.enabled || false,
        externalId: data.extId,
        createdAt: data.createdAt
      };
    } catch (error) {
      console.error('Error fetching pass:', error);
      return null;
    }
  }

  private async createPass(data: PassData): Promise<PassResponse> {
    const passPayload = {
      pass: {
        extId: data.externalId,
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

    const response = await fetch(
      `${this.config.apiUrl}/passes?passTemplate=${this.config.templateId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passPayload),
      }
    );

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
        errorText
      });
      throw new Error(`Failed to create pass: ${response.statusText}`);
    }

    const responseData = await response.json();
    return {
      id: responseData.id,
      url: responseData.url || responseData.passUrl,
      nfcEnabled: responseData.passContent?.nfc?.enabled || true,
      externalId: data.externalId,
      createdAt: responseData.createdAt || new Date().toISOString()
    };
  }

  async updatePass(passId: string, updates: Partial<PassData>): Promise<PassResponse> {
    const response = await fetch(`${this.config.apiUrl}/passes/${passId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update pass: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const passEntryService = new PassEntryService({
  apiKey: process.env.NEXT_PUBLIC_PASSENTRY_API_KEY || '',
  templateId: process.env.NEXT_PUBLIC_PASSENTRY_TEMPLATE_ID || '',
  apiUrl: process.env.NEXT_PUBLIC_PASSENTRY_API_URL || '',
});

export type { PassData, PassResponse };