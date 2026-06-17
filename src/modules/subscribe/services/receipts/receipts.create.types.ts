/**
 * Товарная позиция в запросе {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.create | receipts.create}.
 *
 * @example
 * ```ts
 * const item: CreateReceiptItemInput = {
 *   title: 'Помидоры',
 *   price: 505_000,
 *   count: 2,
 *   code: '00702001001000001',
 *   units: 241_092,
 *   vat_percent: 15,
 *   package_code: '123456',
 *   discount: 10_000,
 * };
 * ```
 */
export interface CreateReceiptItemInput {
    /**
     * Скидка с учётом количества товаров или услуг в тийинах.
     *
     * @optional
     */
    discount?: number;

    /** Название товара или услуги. */
    title: string;

    /** Цена за единицу в тийинах. */
    price: number;

    /** Количество товаров или услуг. */
    count: number;

    /**
     * ИКПУ — идентификационный код продукции и услуг.
     *
     * @example '00702001001000001'
     */
    code: string;

    /**
     * Код единицы измерения.
     *
     * @optional
     */
    units?: number;

    /** Код упаковки для конкретного товара или услуги. */
    package_code: string;

    /** Процент НДС для данного товара или услуги. */
    vat_percent: number;
}

/**
 * Детализация платежа в запросе {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.create | receipts.create}.
 *
 * Используется для фискализации чека.
 *
 * @example
 * ```ts
 * const detail: CreateReceiptDetailInput = {
 *   receipt_type: 0,
 *   shipping: { title: 'Доставка до ттз-4 28/23', price: 500_000 },
 *   items: [
 *     {
 *       title: 'Помидоры',
 *       price: 505_000,
 *       count: 2,
 *       code: '00702001001000001',
 *       vat_percent: 15,
 *       package_code: '123456',
 *     },
 *   ],
 * };
 * ```
 */
export interface CreateReceiptDetailInput {
    /**
     * Тип фискального чека.
     *
     * @example 0 — продажа/возврат
     */
    receipt_type: number;

    /**
     * Доставка.
     *
     * @optional
     */
    shipping?: {
        title: string;
        price: number;
    };

    /** Товарные позиции. */
    items: CreateReceiptItemInput[];
}

/**
 * Параметры запроса метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.create | receipts.create}.
 *
 * Создаёт чек на оплату. Вызывается с **server** авторизацией (`merchantId:secretKey`).
 *
 * @example
 * ```ts
 * const params: CreateReceiptParams = {
 *   amount: 500_000,
 *   account: { order_id: 'test' },
 *   description: 'Подписка Spotify',
 * };
 * ```
 */
export interface CreateReceiptParams {
    /** Сумма платежа в тийинах. */
    amount: number;

    /**
     * Объект Account — идентификаторы заказа в системе мерчанта.
     *
     * Payme сохраняет и возвращает эти данные в чеке.
     *
     * @example { order_id: 'ORD-1001', subscription_id: 'sub_42' }
     */
    account: Record<string, unknown>;

    /**
     * Описание платежа.
     *
     * @optional
     */
    description?: string;

    /**
     * Детализация платежа для фискального чека.
     *
     * @optional
     */
    detail?: CreateReceiptDetailInput;
}

/**
 * Ответ метода {@link https://developer.help.paycom.uz/metody-subscribe-api/receipts.create | receipts.create}.
 *
 * @internal Используется внутри SDK для unwrap ответа API.
 */
export interface CreateReceiptResult {
    /** Созданный чек. */
    receipt: Receipt;
}

/**
 * Чек в ответах Subscribe API.
 *
 * Используется в `receipts.create`, `receipts.get`, `receipts.check` и других методах.
 *
 * @example
 * ```ts
 * const receipt: Receipt = {
 *   _id: '62da73b0803aced907a52b46',
 *   create_time: 1_658_483_632_482,
 *   pay_time: 0,
 *   cancel_time: 0,
 *   state: 0,
 *   type: 2,
 *   external: false,
 *   operation: -1,
 *   category: null,
 *   error: null,
 *   description: '',
 *   amount: 500_000,
 *   currency: 860,
 *   commission: 0,
 *   account: [{ name: 'order_id', title: 'Номер заказа', value: 'test', main: true }],
 *   card: null,
 *   merchant: { ... },
 *   meta: { source: 'subscribe', owner: '...' },
 *   processing_id: null,
 * };
 * ```
 */
export interface Receipt {
    /** Идентификатор чека. Используется в `receipts.pay`, `receipts.check` и др. */
    _id: string;

    /** Время создания чека (Unix timestamp, мс). */
    create_time: number;

    /** Время оплаты. `0` — чек ещё не оплачен. */
    pay_time: number;

    /** Время отмены. `0` — чек не отменён. */
    cancel_time: number;

    /**
     * Состояние чека.
     *
     * @see {@link https://developer.help.paycom.uz/metody-subscribe-api/sostoyaniya-cheka | Состояния чека}
     */
    state: number;

    /** Тип чека. */
    type: number;

    /** Внутренний флаг Payme. */
    external: boolean;

    /** Внутренний код операции Payme. */
    operation: number;

    category: unknown | null;
    error: unknown | null;

    /** Описание платежа. */
    description: string;

    /** Детализация чека (товары, доставка, скидка). */
    detail?: CreateReceiptDetail;

    /** Сумма в тийинах. */
    amount: number;

    /** Код валюты. `860` — UZS. */
    currency: number;

    /** Комиссия. */
    commission: number;

    /**
     * Account-поля чека — идентификаторы заказа, переданные при создании.
     *
     * Связывает чек Payme с сущностью в системе мерчанта.
     */
    account: ReceiptAccountEntry[];

    /** Данные карты после оплаты. `null` до оплаты. */
    card: unknown | null;

    /** Данные мерчанта. */
    merchant: ReceiptMerchant;

    /** Метаданные чека. */
    meta: ReceiptMeta;

    processing_id: string | null;
}

/**
 * Детализация чека в ответе API.
 */
export interface CreateReceiptDetail {
  discount?: {
    title: string;
    price: number;
  };
  shipping?: {
    title: string;
    price: number;
  };
  items?: CreateReceiptItem[];
}

/**
 * Товарная позиция в ответе API.
 */
export interface CreateReceiptItem {
  title: string;
  price: number;
  count: number;
  code: string;
  units?: number;
  vat_percent: number;
  package_code: string;
}

/**
 * Запись Account в чеке.
 *
 * @example
 * ```ts
 * { name: 'order_id', title: 'Номер заказа', value: 'test', main: true }
 * ```
 */
export interface ReceiptAccountEntry {
    /** Ключ поля (например, `order_id`). */
    name: string;

    /** Человекочитаемое название. */
    title: string;

    /** Значение, переданное мерчантом при создании чека. */
    value: string | number | boolean;

    /** Основное поле account. */
    main: boolean;
}

/**
 * Данные мерчанта в чеке.
 */
export interface ReceiptMerchant {
    _id: string;
    name: string;
    organization: string;
    address: string;
    business_id: string;

    /**
     * Данные кассы (EPOS): merchantId и terminalId терминала.
     *
     * Информационное поле, задаётся Payme.
     */
    epos: { merchantId: string; terminalId: string };

    date: number;
    logo: string | null;
    type: string;
    terms: unknown | null;
}

/**
 * Метаданные чека.
 */
export interface ReceiptMeta {
    /** Источник создания чека. */
    source: string;

    /** Идентификатор владельца. */
    owner: string;
}
