import { PaymeConfig } from "../../types";
import { JsonRpcClient } from "../../core/json-rpc-client";
import { CardsService } from "./services/cards/CardsService";

export class SubscribeModule {
    readonly cards: CardsService;

    constructor(
        config: PaymeConfig,
    ) {
        const clientRpc = new JsonRpcClient(config, 'client');
        const serverRpc = new JsonRpcClient(config, 'server');
        this.cards = new CardsService(clientRpc);
    }
}