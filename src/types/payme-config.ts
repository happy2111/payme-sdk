import { PaymeMode, PaymeAuthMode} from "./payme.types";

export interface PaymeConfig {
    merchantId: string;
    secretKey?: string;
    mode?: PaymeMode;
    baseUrl?: string;
}

