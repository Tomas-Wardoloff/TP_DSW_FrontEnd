export interface User {
    id?: number;
    email: string;
    password: string;
    phoneNumber: string;
    userType: UserType;
    isActive: Boolean;
    lastLogin: String;
}

export enum UserType {
    ATHLETE = 'ATHLETE',
    CLUB = 'CLUB',
    AGENT = 'AGENT'
}