export interface JsonRpcError {
    code: number;
    message: string;
    data?: unknown;
}
  
export interface JsonRpcResponse<T> {
    jsonrpc: '2.0';
    id: number;
    result?: T;
    error?: JsonRpcError;
}