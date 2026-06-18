export class PaymeError extends Error {
    constructor(
        message: string,
        public code?: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'PaymeError';
    }
}
