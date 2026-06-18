import { PaymeConfig } from "../../types";
import { JsonRpcClient } from "../../core/json-rpc-client";
import { CardsService } from "./services/cards/CardsService";
import { ReceiptsService } from "./services/receipts/ReceiptsService";

export class SubscribeModule {
    readonly cards: CardsService;
    readonly receipts: ReceiptsService;

    constructor(
        config: PaymeConfig,
    ) {
        const clientRpc = new JsonRpcClient(config, 'client');
        const serverRpc = new JsonRpcClient(config, 'server');
        this.cards = new CardsService(clientRpc, serverRpc);
        this.receipts = new ReceiptsService(serverRpc);
    }
}