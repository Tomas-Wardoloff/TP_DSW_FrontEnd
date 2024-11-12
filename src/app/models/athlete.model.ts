import { User } from './user.model';

export interface Athlete{
  id?: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  nationality: string;
  sport: string;
  position: string;
  isSigned: Boolean;
  user: User;
}
