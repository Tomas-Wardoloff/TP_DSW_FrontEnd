// src/app/models/user.model.ts

export interface User {
    userId: number;
    email: string;
    password: string;
    phoneNumber: string;
    userType: UserType;
    isActive: Boolean;
    lastLogin: Date;
    
    // Otros atributos comunes de User
}
export enum UserType {
    ATHLETE = 'athlete',
    CLUB = 'club',
    AGENT = 'agent'
}