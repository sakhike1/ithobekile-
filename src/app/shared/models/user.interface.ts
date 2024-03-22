export interface IUser {
    phone: string;
    name: string;
    surname: string;
    preferred_name: string;
    email: string;
    verified: boolean;
    promocode: string;
    is_blocked: boolean;
    authorities: string;
    password: string;
    confirm_password?: string; // This is not for the API, but for the form
    id?: string;
}