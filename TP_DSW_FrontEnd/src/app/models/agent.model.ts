// src/app/models/agent.model.ts
import { User } from './user.model';

export interface Agent extends User {
  firstName: string;
  lastName: string;
  id: number;
  clubId?: number;
  userId: number;

}
