import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReminderInterface {
  id?: string;
  details: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ReminderGetQueryInterface extends GetQueryInterface {
  id?: string;
  details?: string;
  user_id?: string;
}
