const mapping: Record<string, string> = {
  drivers: 'driver',
  fuels: 'fuel',
  'loading-slips': 'loading_slip',
  organizations: 'organization',
  positions: 'position',
  reminders: 'reminder',
  suppliers: 'supplier',
  transporters: 'transporter',
  trips: 'trip',
  users: 'user',
  vehicles: 'vehicle',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
