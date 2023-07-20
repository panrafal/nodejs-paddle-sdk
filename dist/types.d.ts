import { PaddleWebhook } from './webhook';
export declare type State = 'active' | 'trialing' | 'past_due' | 'deleted' | 'paused';
export declare type PlanType = 'day' | 'week' | 'month' | 'year';
export declare type ListCouponsParameters = {
    product_id: number;
};
export declare type Coupon = {
    coupon: string;
    description: string;
    discount_type: 'flat' | 'percentage';
    discount_amount: number;
    discount_currency: string;
    allowed_uses: number;
    times_used: number;
    is_recurring: boolean;
    expires: string;
};
export declare type ListCouponsResponse = Coupon[];
export declare type CreateCouponsParameters = {
    coupon_code?: string;
    coupon_prefix?: string;
    num_coupons?: number;
    description?: string;
    coupon_type: 'product' | 'checkout';
    product_ids?: string;
    discount_type: 'flat' | 'percentage';
    discount_amount: number;
    currency?: 'USD' | 'GBP' | 'EUR';
    allowed_uses?: number;
    expires?: string;
    recurring?: 0 | 1;
    group?: string;
};
export declare type CreateCouponsResponse = {
    coupon_codes: string[];
};
export declare type DeleteCouponsParameters = {
    coupon_code: string;
    product_id?: number;
};
export declare type UpdateCouponsParameters = {
    coupon_code?: string;
    group?: string;
    new_coupon_code?: string;
    new_group?: string;
    product_ids?: string;
    expires?: string;
    allowed_uses?: number;
    currency?: 'USD' | 'GBP' | 'EUR';
    discount_amount?: number;
    recurring?: 0 | 1;
};
export declare type UpdateCouponsResponse = {
    updated: number;
};
export declare type Product = {
    id: number;
    name: string;
    description: string | null;
    base_price: number;
    sale_price: null;
    screenshots: Record<string, unknown>[];
    icon: string;
    currency: 'USD' | 'GBP' | 'EUR';
};
export declare type ListProductsResponse = {
    total: number;
    count: number;
    products: Product[];
};
export declare type GenerateLicenseParameters = {
    product_id: number;
    allowed_uses: number;
    expires_at?: string;
};
export declare type License = {
    license_code: string;
    expires_at: string;
};
export declare type GenerateLicenseResponse = License;
export declare type GeneratePayLinkParameters = {
    /**
     * The Paddle Product ID/Plan ID that you want to base this custom checkout on. Required if not using custom products.
     *
     * If no product_id is set, custom non-subscription product checkouts can be generated instead by specifying the required fields: title, webhook_url and prices. Note that coupon_code cannot be used with custom products.
     */
    product_id?: number;
    title?: string;
    /**
     * An endpoint that we will call with transaction information upon successful checkout, to allow you to fulfill the purchase.
     *
     * Only valid (and required) if product_id is not set. Not valid for subscription plans.
     *
     * Note: testing on localhost is not supported. Please use an internet-accessible URL.
     */
    webhook_url?: string;
    prices?: string;
    recurring_prices?: string;
    trial_days?: number;
    custom_message?: string;
    coupon_code?: string;
    discountable?: 0 | 1;
    image_url?: string;
    return_url?: string;
    quantity_variable?: 0 | 1;
    quantity?: number;
    expires?: string;
    affiliates?: string;
    recurring_affiliate_limit?: number;
    marketing_consent?: 0 | 1;
    customer_email?: string;
    customer_country?: string;
    customer_postcode?: string;
    is_recoverable?: 0 | 1;
    passthrough?: string;
    vat_number?: string;
    vat_company_name?: string;
    vat_street?: string;
    vat_city?: string;
    vat_state?: string;
    vat_country?: string;
    vat_postcode?: string;
};
export declare type PayLink = string;
export declare type GeneratePayLinkResponse = {
    url: PayLink;
};
export declare type ListTransactionsEntity = 'user' | 'subscription' | 'order' | 'checkout' | 'product';
export declare type ListTransactionsParameters = {
    entity: ListTransactionsEntity;
    entity_id: string | number;
    page?: number;
};
export declare type Transaction = {
    order_id: string;
    checkout_id: string;
    amount: string;
    currency: 'USD' | 'GBP' | 'EUR';
    custom_data: string;
    status: State;
    created_at: string;
    passthrough: string | null;
    product_id: number;
    is_subscription: boolean;
    is_one_off: boolean;
    subscription: {
        subscription_id: number;
        status: State;
    } | null;
    user: {
        user_id: number;
        email: string;
        marketing_consent: boolean;
    };
    receipt_url: string;
};
export declare type ListTransactionsResponse = Transaction[];
export declare type RefundPaymentParameters = {
    order_id: string;
    amount?: number;
    reason?: string;
};
export declare type RefundPaymentResponse = {
    refund_request_id: number;
};
export declare type ListPlansParameters = {
    plan?: number;
};
export declare type Plan = {
    id: number;
    name: string;
    billing_type: PlanType;
    billing_period: number;
    initial_price: {
        [currency_code: string]: string | number;
    };
    recurring_price: {
        [currency_code: string]: string | number;
    };
    trial_days: number;
};
export declare type ListPlansResponse = Plan[];
export declare type CreatePlanParameters = {
    plan_name: string;
    plan_length: string;
    plan_type: PlanType;
    plan_trial_days?: number;
    main_currency_code?: string;
    recurring_price_usd?: string;
    recurring_price_gbp?: string;
    recurring_price_eur?: string;
};
export declare type CreatePlanResponse = {
    product_id: number;
};
export declare type ListUsersParameters = {
    subscription_id?: number;
    plan_id?: number;
    state?: State;
    page?: number;
    results_per_page?: number;
};
export declare type User = {
    subscription_id: number;
    plan_id: number;
    user_id: number;
    user_email: string;
    marketing_consent: boolean;
    custom_data: string;
    state: State;
    signup_date: string;
    last_payment: {
        amount: number;
        currency: string;
        date: string;
    } | null;
    next_payment: {
        amount: number;
        currency: string;
        date: string;
    } | null;
    update_url: string;
    cancel_url: string;
    paused_at?: string;
    paused_from?: string;
    payment_information: {
        payment_method: 'card';
        card_type: 'master' | 'visa' | 'american_express' | 'discover' | 'jcb' | 'maestro' | 'diners_club' | 'unionpay';
        last_four_digits: string;
        expiry_date: string;
    } | {
        payment_method: 'paypal';
    };
};
export declare type ListUsersResponse = User[];
export declare type UpdateUserParameters = {
    subscription_id: number;
    quantity?: number;
    currency?: 'USD' | 'GBP' | 'EUR';
    recurring_price?: number;
    bill_immediately?: boolean;
    plan_id?: number;
    prorate?: boolean;
    keep_modifiers?: boolean;
    passthrough?: string;
    pause?: boolean;
};
export declare type UpdateUserResponse = {
    subscription_id: number;
    user_id: number;
    plan_id: number;
    next_payment: {
        amount: number;
        currency: string;
        date: string;
    };
};
export declare type CancelUserParameters = {
    subscription_id: number;
};
export declare type ListModifiersParameters = {
    subscription_id?: string;
    plan_id?: string;
};
export declare type Modifier = {
    modifier_id: number;
    subscription_id: number;
    amount: string;
    currency: string;
    is_recurring: boolean;
    description?: string;
};
export declare type ListModifiersResponse = Modifier[];
export declare type CreateModifiersParameters = {
    subscription_id: number;
    modifier_recurring?: boolean;
    modifier_amount: number;
    modifier_description?: string;
};
export declare type CreateModifiersResponse = {
    subscription_id: number;
    modifier_id: number;
};
export declare type DeleteModifiersParameters = {
    modifier_id: number;
};
export declare type ListPaymentsParameters = {
    subscription_id?: number;
    plan?: number;
    is_paid?: 0 | 1;
    from?: string;
    to?: string;
    is_one_off_charge?: 0 | 1;
};
export declare type Payment = {
    id: number;
    subscription_id: number;
    amount: number;
    currency: string;
    payout_date: string;
    is_paid: 0 | 1;
    is_one_off_charge: 0 | 1;
    receipt_url: string;
};
export declare type ListPaymentsResponse = Payment[];
export declare type ReschedulePaymentParameters = {
    payment_id: number;
    date: string;
};
export declare type CreateOneOffChargeParameters = {
    subscription_id: number;
    amount: number;
    charge_name: string;
};
export declare type CreateOneOffChargeResponse = {
    invoice_id: number;
    subscription_id: number;
    amount: string;
    currency: string;
    payment_date: string;
    receipt_url: string;
    status: 'success' | 'pending';
};
export declare type GetWebhookHistoryParameters = {
    page?: number;
    alerts_per_page?: string;
    query_head?: string;
    query_tail?: string;
};
export declare type WebhookHistory = {
    id: string;
    alert_name: string;
    status: string;
    created_at: string;
    updated_at: string;
    attempts: number;
    fields: PaddleWebhook;
};
export declare type GetWebhookHistoryResponse = {
    current_page: number;
    total_pages: number;
    alerts_per_page: number;
    total_alerts: number;
    query_head: string;
    query_tail: string;
    data: WebhookHistory[];
};
