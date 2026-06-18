import type { JsonRpcClient } from './json-rpc-client';

export class ClientBaseService {
  constructor(protected readonly clientRpc: JsonRpcClient) {}
}

export class ServerBaseService {
  constructor(protected readonly serverRpc: JsonRpcClient) {}
}