import type { PaymeAuthMode, PaymeMode } from '../types/payme.types';
import type { PaymeConfig } from '../types/payme-config';

export const DEFAULT_BASE_URLS: Record<PaymeMode, string> = {
  test: 'https://checkout.test.paycom.uz/api',
  production: 'https://checkout.paycom.uz/api',
};

export function resolveBaseUrl(config: PaymeConfig): string {
  if (config.baseUrl) return config.baseUrl;
  return DEFAULT_BASE_URLS[config.mode ?? 'test'];
}

export function buildAuthHeader(
  config: PaymeConfig,
  authMode: PaymeAuthMode,
): string {
  if (authMode === 'client') {
    return config.merchantId;
  }

  if (!config.secretKey) {
    throw new Error('secretKey is required for server auth mode');
  }

  return `${config.merchantId}:${config.secretKey}`;
}