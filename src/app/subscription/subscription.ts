export interface Subscription {
    phone: string;
    option: string ; // 'promo' or 'website' or 'website+chat' or 'tutorial'
    grade: string;
    promocode: string;
    amount: number;
    description: string;
    reference: string;
    payment_status: string;
}

