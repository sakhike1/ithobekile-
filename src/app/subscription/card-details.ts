export interface CardDetails {
    choice: string;
    description: string;
    amount: number;
    amount_description: string;
    duration: string;
    title: string;
    features: string[];
    button: string;
    best: boolean;
}

// choice: 'promo' | 'website' | 'website+chat' | 'tutorial', amount: number, description: string