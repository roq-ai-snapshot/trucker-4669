import { LoadingSlipInterface } from 'interfaces/loading-slip';
import { VehicleInterface } from 'interfaces/vehicle';
import { GetQueryInterface } from 'interfaces';

export interface TripInterface {
  id?: string;
  cost: number;
  vehicle_id?: string;
  created_at?: any;
  updated_at?: any;
  loading_slip?: LoadingSlipInterface[];
  vehicle?: VehicleInterface;
  _count?: {
    loading_slip?: number;
  };
}

export interface TripGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_id?: string;
}
