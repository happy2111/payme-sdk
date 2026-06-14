import type { JsonRpcClient } from './json-rpc-client';
export class BaseService {
    constructor(protected readonly rpc: JsonRpcClient) {}
}