import { User } from './user.model';

export interface Club{
  id?:number;
  name: string;
  address: string;
  openingDate: Date;
  user: User;
}