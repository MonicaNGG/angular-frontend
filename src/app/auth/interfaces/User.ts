export interface User{
    name: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    email: string;
    password: string;
    verificationCode: string | null;
    enabled: boolean;
}