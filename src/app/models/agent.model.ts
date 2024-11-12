import { User } from './user.model';


export interface Agent{
  id?: number;
  firstName: string;
  lastName: string;
  club: number;
  user: User;
}