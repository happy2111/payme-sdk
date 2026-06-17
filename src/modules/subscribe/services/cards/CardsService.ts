import type { JsonRpcClient } from '../../../../core/json-rpc-client';
import { ClientBaseService } from '../../../../core/rpc-base.service';
import type {
    Card,
    CardResult,
    CheckCardParams,
    CreateCardParams,
    GetVerifyCodeParams,
    GetVerifyCodeResult,
    RemoveCardParams,
    RemoveCardResult,
    VerifyCardParams,
} from './cards.types';

export class CardsService extends ClientBaseService {
    constructor(
        clientRpc: JsonRpcClient,
        private readonly serverRpc: JsonRpcClient,
    ) {
        super(clientRpc);
    }

    async create(params: CreateCardParams): Promise<Card> {
        return this.clientRpc.call<Card>('cards.create', params);
    }

    async getVerifyCode(params: GetVerifyCodeParams): Promise<GetVerifyCodeResult> {
        return this.clientRpc.call<GetVerifyCodeResult>('cards.get_verify_code', params);
    }

    async verify(params: VerifyCardParams): Promise<Card> {
        const result = await this.clientRpc.call<CardResult>('cards.verify', params);
        return result.card;
    }

    async check(params: CheckCardParams): Promise<Card> {
        const result = await this.serverRpc.call<CardResult>('cards.check', params);
        return result.card;
    }

    async remove(params: RemoveCardParams): Promise<RemoveCardResult> {
        return this.serverRpc.call<RemoveCardResult>('cards.remove', params);
    }
}
