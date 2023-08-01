import { TripInterface } from 'interfaces/trip';
import { GetQueryInterface } from 'interfaces';

export interface LoadingSlipInterface {
  id?: string;
  details: string;
  trip_id?: string;
  created_at?: any;
  updated_at?: any;

  trip?: TripInterface;
  _count?: {};
}

export interface LoadingSlipGetQueryInterface extends GetQueryInterface {
  id?: string;
  details?: string;
  trip_id?: string;
}
