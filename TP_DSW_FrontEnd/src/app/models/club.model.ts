// src/app/models/club.model.ts
import { User } from './user.model';

export interface Club extends User {
  name: string;
  adress: string;
  openingDate: Date;
  userId: number;
}