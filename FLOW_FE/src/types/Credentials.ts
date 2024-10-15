export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    repeatPassword: string;
}
