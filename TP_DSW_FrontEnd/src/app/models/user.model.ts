// src/app/models/user.model.ts

export interface User {
    id?: number;
    email: string;
    password: string;
    phoneNumber: string;
    userType: UserType;
    isActive: Boolean;
    lastLogin: String;
    
    // Otros atributos comunes de User
}
export enum UserType {
    ATHLETE = 'ATHLETE',
    CLUB = 'CLUB',
    AGENT = 'AGENT'
}