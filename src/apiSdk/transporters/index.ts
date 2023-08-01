import axios from 'axios';
import queryString from 'query-string';
import { TransporterInterface, TransporterGetQueryInterface } from 'interfaces/transporter';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTransporters = async (
  query?: TransporterGetQueryInterface,
): Promise<PaginatedInterface<TransporterInterface>> => {
  const response = await axios.get('/api/transporters', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTransporter = async (transporter: TransporterInterface) => {
  const response = await axios.post('/api/transporters', transporter);
  return response.data;
};

export const updateTransporterById = async (id: string, transporter: TransporterInterface) => {
  const response = await axios.put(`/api/transporters/${id}`, transporter);
  return response.data;
};

export const getTransporterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/transporters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTransporterById = async (id: string) => {
  const response = await axios.delete(`/api/transporters/${id}`);
  return response.data;
};
