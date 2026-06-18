import { SubscribeModule } from './modules/subscribe/SubscribeModule';
import type { PaymeConfig } from './types';

export class PaymeSDK {
  readonly subscribe: SubscribeModule;

  constructor(config: PaymeConfig) {
    PaymeSDK.validateConfig(config);
    this.subscribe = new SubscribeModule(config);
  }

  private static validateConfig(config: PaymeConfig): void {
    if (!config?.merchantId?.trim()) {
      throw new Error('merchantId is required');
    }
  }
}
