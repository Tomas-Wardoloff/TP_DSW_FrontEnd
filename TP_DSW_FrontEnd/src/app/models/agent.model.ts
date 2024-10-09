// src/app/models/agent.model.ts
import { User } from './user.model';

export interface Agent extends User {
  agentId: number;
  firstName: string;
  lastName: string;
  userId: number;
  clubId: number;
}
