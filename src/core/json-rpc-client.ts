import axios, { isAxiosError } from 'axios';
import { buildAuthHeader, resolveBaseUrl } from './config';
import { PaymeError } from './errors';
import type { PaymeAuthMode, PaymeConfig, JsonRpcResponse, JsonRpcError } from '../types';
import crypto from 'crypto';

export class JsonRpcClient {

  constructor(
    private readonly config: PaymeConfig,
    private readonly authMode: PaymeAuthMode,
  ) {}

  async call<T>(method: string, params?: unknown): Promise<T> {
    try {
      const { data } = await axios.post<JsonRpcResponse<T>>(
        resolveBaseUrl(this.config),
        {
          jsonrpc: '2.0',
          id: crypto.randomUUID(),
          method,
          params: params ?? {},
        },
        {
          headers: {
            'X-Auth': buildAuthHeader(this.config, this.authMode),
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.error) {
        throw new PaymeError(data.error.message, data.error.code, data.error.data);
      }

      return data.result as T;
    } catch (error) {
      if (error instanceof PaymeError) {
        throw error;
      }

      if (isAxiosError(error)) {
        const rpcError = error.response?.data?.error as JsonRpcError | undefined;

        if (rpcError) {
          throw new PaymeError(rpcError.message, rpcError.code, rpcError.data);
        }

        throw new PaymeError(
          error.message,
          error.response?.status,
          error.response?.data,
        );
      }

      throw error;
    }
  }
}