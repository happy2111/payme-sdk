import { ServerBaseService } from '../../../../core/rpc-base.service';
import type { CreateReceiptParams, Receipt } from './receipts.create.types';
import type { ReceiptsPayParams, ReceiptsSendParams, ReceiptsCheckResult, ReceiptResult, ReceiptByIdParams, ReceiptsSetFiscalDataParams, ReceiptSuccessResult, ReceiptsGetAllParams} from './receipts.types';
export class ReceiptsService extends ServerBaseService {
    
    async create(params: CreateReceiptParams): Promise<Receipt> {
        const result = await this.serverRpc.call<ReceiptResult>('receipts.create', params);
        return result.receipt;
    }

    async pay(params: ReceiptsPayParams): Promise<Receipt> {
        const result = await this.serverRpc.call<ReceiptResult>('receipts.pay', params);
        return result.receipt;
    }

    async send(params: ReceiptsSendParams): Promise<ReceiptSuccessResult> {
        const result = await this.serverRpc.call<ReceiptSuccessResult>('receipts.send', params);
        return result;
    }

    async cancel(params: ReceiptByIdParams): Promise<Receipt> {
        const result = await this.serverRpc.call<ReceiptResult>('receipts.cancel', params);
        return result.receipt;
    }

    async check(params: ReceiptByIdParams): Promise<ReceiptsCheckResult> {
        const result = await this.serverRpc.call<ReceiptsCheckResult>('receipts.check', params);
        return result;
    }
    
    async get(params: ReceiptByIdParams): Promise<Receipt> {
        const result = await this.serverRpc.call<ReceiptResult>('receipts.get', params);
        return result.receipt;
    }

    async setFiscalData(params: ReceiptsSetFiscalDataParams): Promise<ReceiptSuccessResult> {
        const result = await this.serverRpc.call<ReceiptSuccessResult>('receipts.set_fiscal_data', params);
        return result;
    }

    async getAll(params: ReceiptsGetAllParams): Promise<Receipt[]> {
        const result = await this.serverRpc.call<Receipt[]>('receipts.get_all', params);
        return result;
    }

    
}
