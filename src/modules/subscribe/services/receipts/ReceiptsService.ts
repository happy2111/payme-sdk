import { JsonRpcClient } from '../../../../core/json-rpc-client';
import { ServerBaseService } from '../../../../core/rpc-base.service';
import type { CreateReceiptParams, CreateReceiptResult, Receipt } from './receipts.create.types';

export class ReceiptsService extends ServerBaseService {
    
    async create(params: CreateReceiptParams): Promise<Receipt> {
        const result = await this.serverRpc.call<CreateReceiptResult>('receipts.create', params);
        return result.receipt;
    }
    
}