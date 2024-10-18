// src/app/models/club.model.ts
import { User } from './user.model';

export interface Club extends User {
  id?:number;
  name: string;
  adress: string;
  openingDate: Date;
  userId: number;
}