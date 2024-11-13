export interface User {
    id?: number;
    email: string;
    password: string;
    phoneNumber: string;
    userType: UserType;
    isActive: Boolean;
    lastLogin: Date;
}

export enum UserType {
    ATHLETE = 'ATHLETE',
    CLUB = 'CLUB',
    AGENT = 'AGENT'
}