import { PositionInterface } from 'interfaces/position';
import { TripInterface } from 'interfaces/trip';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  info: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  position?: PositionInterface[];
  trip?: TripInterface[];
  organization?: OrganizationInterface;
  _count?: {
    position?: number;
    trip?: number;
  };
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  info?: string;
  organization_id?: string;
}
