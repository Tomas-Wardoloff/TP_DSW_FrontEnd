// src/app/models/agent.model.ts
import { User } from './user.model';

export interface Agent extends User {
  id?: number;
  firstName: string;
  lastName: string;
  clubId?: number;
  userId: number;

}
