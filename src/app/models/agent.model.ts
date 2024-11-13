import { User } from './user.model';
import { Club } from './club.model';

export interface Agent{
  id?: number;
  firstName: string;
  lastName: string;
  club: Club;
  user: User;
}