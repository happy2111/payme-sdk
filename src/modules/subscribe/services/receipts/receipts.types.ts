import type { CreateReceiptResult } from './receipts.create.types';

/**
 * Обёртка ответа методов, возвращающих чек в поле `receipt`.
 *
 * Используется в `receipts.create`, `receipts.pay`, `receipts.cancel`, `receipts.get`.
 *
 * @internal Используется внутри SDK для unwrap ответа API.
 */
export interface ReceiptResult extends CreateReceiptResult {}

/**
 * Параметры методов, принимающих идентификатор чека.
 *
 * @example
 * ```ts
 * const params: ReceiptByIdParams = { id: '2e0b1bc1f1eb50d487ba268d' };
 * ```
 */
export interface ReceiptByIdParams {
    /** ID чека в Payme. */
    id: string;
}

/**
 * Ответ методов с флагом успешности.
 *
 * Используется в {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.send | receipts.send}
 * и {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.set_fiscal_data | receipts.set_fiscal_data}.
 *
 * @example
 * ```ts
 * const result: ReceiptSuccessResult = { success: true };
 * ```
 */
export interface ReceiptSuccessResult {
    /** Флаг успешного выполнения операции. */
    success: boolean;
}

/**
 * Параметры запроса метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.pay | receipts.pay}.
 *
 * Оплачивает чек по токену карты.
 * Вызывается с **server** авторизацией (`merchantId:secretKey`).
 *
 * @example
 * ```ts
 * const params: ReceiptsPayParams = {
 *   id: '2e0b1bc1f1eb50d487ba268d',
 *   token: '...',
 *   payer: { phone: '998901304527' },
 * };
 * ```
 */
export interface ReceiptsPayParams extends ReceiptByIdParams {
    /** Токен карты. */
    token: string;

    /**
     * Дополнительная информация о плательщике для антифрода.
     *
     * @optional
     */
    payer?: Payer;

    /**
     * Флаг холдирования чека.
     *
     * @optional
     */
    hold?: boolean;
}

/**
 * Данные плательщика для антифрод-системы.
 */
export interface Payer {
    /** Идентификатор плательщика в системе мерчанта. */
    id?: string;

    /**
     * Номер телефона.
     *
     * @example '998901304527'
     */
    phone?: string;

    /** Email. */
    email?: string;

    /** Имя плательщика. */
    name?: string;

    /** IP-адрес плательщика. */
    ip?: string;
}

/**
 * Параметры запроса метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.send | receipts.send}.
 *
 * Отправляет чек на оплату в SMS-сообщении.
 *
 * @example
 * ```ts
 * const params: ReceiptsSendParams = {
 *   id: '2e0b1bc1f1eb50d487ba268d',
 *   phone: '998901304527',
 * };
 * ```
 */
export interface ReceiptsSendParams extends ReceiptByIdParams {
    /** Номер телефона получателя инвойса. */
    phone: string;
}

/**
 * Состояния чека.
 *
 * @see {@link https://developer.help.paycom.uz/metody-subscribe-api/sostoyaniya-cheka | Состояния чека}
 */
export enum ReceiptState {
    /** Чек создан. Ожидание подтверждения оплаты. */
    CREATED = 0,

    /** Первая стадия проверок. Создание транзакции в биллинге поставщика. */
    FIRST_STAGE_CHECK = 1,

    /** Списание денег с карты. */
    DEBIT_MONEY = 2,

    /** Закрытие транзакции в биллинге поставщика. */
    CLOSE_TRANSACTION = 3,

    /** Чек оплачен. */
    PAID = 4,

    /** Чек заходирован. */
    HOLDED = 5,

    /**
     * Получение команды на холдирование средств.
     * При длительном нахождении в этом статусе обратитесь в поддержку Payme Business.
     */
    HOLDING = 6,

    /** Чек стоит на паузе для ручного вмешательства. */
    PAUSE = 20,

    /** Чек в очереди на отмену. */
    CANCEL_QUEUE = 21,

    /** Чек в очереди на закрытие транзакции в биллинге поставщика. */
    CLOSE_TRANSACTION_QUEUE = 30,

    /** Чек отменён. */
    CANCELLED = 50,
}

/**
 * Ответ метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.check | receipts.check}.
 *
 * @example
 * ```ts
 * const result: ReceiptsCheckResult = { state: ReceiptState.PAID };
 * ```
 */
export interface ReceiptsCheckResult {
    /** Текущее состояние чека. */
    state: ReceiptState;
}

/**
 * Параметры запроса метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.set_fiscal_data | receipts.set_fiscal_data}.
 *
 * Передаёт фискальный чек в Payme.
 *
 * @example
 * ```ts
 * const params: ReceiptsSetFiscalDataParams = {
 *   id: '2e0b1bc1f1eb50d487ba268d',
 *   fiscal_data: {
 *     receipt_id: 121,
 *     qr_code_url: 'https://...',
 *     status_code: 0,
 *     fiscal_sign: '800031554082',
 *   },
 * };
 * ```
 */
export interface ReceiptsSetFiscalDataParams extends ReceiptByIdParams {
    /** Фискальные данные чека. */
    fiscal_data: FiscalData;
}

/**
 * Фискальные данные для передачи в Payme.
 */
export interface FiscalData {
    /** Код статуса регистрации в ОФД. */
    status_code?: number;

    /** Детальная информация об ошибке (если регистрация в ОФД не удалась). */
    message?: string;

    /** Номер виртуального фискального модуля. */
    terminal_id?: string;

    /** Уникальный порядковый номер платежа для ВФМ. */
    receipt_id: number;

    /**
     * Дата регистрации чека на стороне ОФД.
     *
     * @example '20220706221021'
     */
    date?: string;

    /** Фискальный признак чека платежа. */
    fiscal_sign?: string;

    /** URL фискального чека. */
    qr_code_url: string;
}

/**
 * Параметры запроса метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.get_all | receipts.get_all}.
 *
 * Возвращает список чеков за указанный период.
 *
 * @example
 * ```ts
 * const params: ReceiptsGetAllParams = {
 *   count: 50,
 *   from: 1_636_398_000_000,
 *   to: 1_636_484_000_000,
 *   offset: 0,
 * };
 * ```
 */
export interface ReceiptsGetAllParams {
    /**
     * Количество чеков.
     *
     * Максимальное значение — 50.
     */
    count: number;

    /** Дата начала периода (Unix timestamp, мс). */
    from: number;

    /** Дата окончания периода (Unix timestamp, мс). */
    to: number;

    /**
     * Количество чеков для пропуска от начала периода.
     *
     * Используется для пагинации.
     */
    offset: number;
}
