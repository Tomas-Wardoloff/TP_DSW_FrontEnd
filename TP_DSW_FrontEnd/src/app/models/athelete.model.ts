// src/app/models/athlete.model.ts
import { User } from './user.model';

export interface Athlete extends User {
  athleteId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  nationality: string;
  sport: string;
  position: string;
  isSigned: Boolean;
  userId: number;
}