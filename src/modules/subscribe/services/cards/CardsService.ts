import { ClientBaseService } from '../../../../core/rpc-base.service';
import type { CreateCardParams } from './cards.types';

export class CardsService extends ClientBaseService {

    async create(params: CreateCardParams) {
        return this.clientRpc.call('cards.create', params);
    }

}