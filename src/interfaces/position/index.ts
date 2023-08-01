import { VehicleInterface } from 'interfaces/vehicle';
import { GetQueryInterface } from 'interfaces';

export interface PositionInterface {
  id?: string;
  location: string;
  vehicle_id?: string;
  created_at?: any;
  updated_at?: any;

  vehicle?: VehicleInterface;
  _count?: {};
}

export interface PositionGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  vehicle_id?: string;
}
