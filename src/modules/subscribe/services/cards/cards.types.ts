/**
 * Параметры карты для методов Subscribe API.
 *
 * @example
 * ```ts
 * const card: CardInput = {
 *   number: '8600069195406311',
 *   expire: '0399',
 * };
 * ```
 *
 * @see {@link https://developer.help.paycom.uz/metody-subscribe-api/cards.create | cards.create}
 */
export interface CardInput {
    /** Номер карты. */
    number: string;

    /**
     * Срок окончания действия карты.
     *
     * @example '0399'
     */
    expire: string;
}

/**
 * Параметры запроса метода {@link https://developer.help.paycom.uz/metody-subscribe-api/cards.create | cards.create}.
 *
 * @example
 * ```ts
 * const params: CreateCardParams = {
 *   card: { number: '8600069195406311', expire: '0399' },
 *   save: true,
 * };
 * ```
 *
 * @example
 * ```ts
 * const paramsWithAccount: CreateCardParams = {
 *   card: { number: '8600069195406311', expire: '0399' },
 *   account: { order_id: '12345' },
 *   save: true,
 *   customer: '+998901234567',
 * };
 * ```
 */
export interface CreateCardParams {
    /** Параметры карты. */
    card: CardInput;

    /**
     * Объект Account.
     *
     * @optional
     */
    account?: Record<string, unknown>;

    /**
     * Вид токена.
     *
     * Если `true` — токен можно использовать для дальнейших платежей;
     * если `false` — токен одноразовый и удаляется после оплаты.
     *
     * @optional
     *
     * @example true
     */
    save?: boolean;

    /**
     * Идентификатор пользователя (номер телефона, uid, email и т.п.).
     *
     * @optional
     *
     * @example '+998901234567'
     */
    customer?: string;
}

/**
 * Карта в ответе метода {@link https://developer.help.paycom.uz/metody-subscribe-api/cards.create | cards.create}.
 *
 * @example
 * ```ts
 * const card: Card = {
 *   number: '860006******6311',
 *   expire: '03/99',
 *   token: 'NTg0YTg0ZDYyYWJiNWNhYTMxMDc5OTE0X1VnYU02ME92IUttWHVHRThJODRJNWE0Xl9EYUBPQCZjNSlPRlpLIWNWRz1PNFp6VkIpZU0kQjJkayoyVUVtUuKElmt4JTJYWj9VQGNAQyVqT1pOQ3VXZ2NyajBEMSYkYj0kVj9NXikrJE5HNiN3K25pKHRQOEVwOGpOcUYxQ2dtemk9dDUwKDNATjd2XythbibihJYoJispJUtuREhlaClraGlJWTlLMihrLStlRjd6MFI3VCgjVDlpYjQ1ZThaMiojPVNTZylYJlFWSjlEZGFuSjZDNDJLdlhXP3YmV1B2dkRDa3g5X2l4N28oU0pOVEpSeXZKYnkjK0h3ViZfdmlhUHMp',
 *   recurrent: true,
 *   verify: false,
 * };
 * ```
 */
export interface Card {
    /**
     * Неполный номер карты. Строка может храниться на сервере мерчанта.
     *
     * @example '860006******6311'
     */
    number: string;

    /**
     * Срок окончания действия карты.
     *
     * @example '03/99'
     */
    expire: string;

    /** Токен карты. */
    token: string;

    /**
     * Доступность карты для последующих платежей.
     *
     * @example true
     */
    recurrent: boolean;

    /**
     * Карта проверена способом OTP (one time password).
     *
     * @example false
     */
    verify: boolean;
}




export interface GetVerifyCodeParams {
    token: string;
}