const routeCache = new Map();

export const cacheRoute = (route: string, data: any) => {
  routeCache.set(route, {
    data,
    timestamp: Date.now(),
  });
};

export const getCachedRoute = (route: string) => {
  const cached = routeCache.get(route);
  if (!cached) return null;

  // Cache expiry after 5 minutes
  if (Date.now() - cached.timestamp > 5 * 60 * 1000) {
    routeCache.delete(route);
    return null;
  }

  return cached.data;
};
