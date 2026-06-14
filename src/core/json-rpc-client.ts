import axios, { isAxiosError } from 'axios';
import type { PaymeAuthMode } from '../types/payme.types';
import type { PaymeConfig } from '../types/payme-config';
import { buildAuthHeader, resolveBaseUrl } from './config';
import { PaymeError } from './errors';

interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

interface JsonRpcResponse<T> {
  jsonrpc: '2.0';
  id: number;
  result?: T;
  error?: JsonRpcError;
}

export class JsonRpcClient {
  private requestId = 0;

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
          id: ++this.requestId,
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