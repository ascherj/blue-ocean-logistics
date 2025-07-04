import { QueryClient } from '@tanstack/react-query';

// Type definitions for query filters and parameters
export interface QueryFilters {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

export interface ApiError {
  status?: number;
  message?: string;
}

export interface RouteSearchParams {
  originPort?: string;
  destinationPort?: string;
  cargoType?: string;
  departureDate?: string;
  [key: string]: string | undefined;
}

export interface FreightQuoteParams {
  originPortId: string;
  destinationPortId: string;
  cargoType: string;
  weight?: number;
  volume?: number;
  containerType?: string;
  [key: string]: string | number | undefined;
}

// Create QueryClient with optimized defaults for Ocean Freight Logistics Platform
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh
      staleTime: 5 * 60 * 1000, // 5 minutes for logistics data

      // Cache time: how long inactive data stays in cache
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)

      // Retry configuration for network requests
      retry: (failureCount, error: unknown) => {
        const apiError = error as ApiError;
        // Don't retry on 4xx errors (client errors)
        if (
          apiError?.status &&
          apiError.status >= 400 &&
          apiError.status < 500
        ) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus for real-time logistics data
      refetchOnWindowFocus: true,

      // Refetch on reconnect for offline scenarios
      refetchOnReconnect: true,

      // Background refetch interval for critical data
      refetchInterval: false, // We'll set this per query as needed

      // Enable background updates
      refetchIntervalInBackground: false,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,

      // Retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Shipments
  shipments: {
    all: ['shipments'] as const,
    lists: () => [...queryKeys.shipments.all, 'list'] as const,
    list: (filters: QueryFilters) =>
      [...queryKeys.shipments.lists(), { filters }] as const,
    details: () => [...queryKeys.shipments.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.shipments.details(), id] as const,
    tracking: (id: string) =>
      [...queryKeys.shipments.detail(id), 'tracking'] as const,
  },

  // Routes
  routes: {
    all: ['routes'] as const,
    lists: () => [...queryKeys.routes.all, 'list'] as const,
    list: (filters: QueryFilters) =>
      [...queryKeys.routes.lists(), { filters }] as const,
    details: () => [...queryKeys.routes.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.routes.details(), id] as const,
    search: (params: RouteSearchParams) =>
      [...queryKeys.routes.all, 'search', params] as const,
  },

  // Ports
  ports: {
    all: ['ports'] as const,
    lists: () => [...queryKeys.ports.all, 'list'] as const,
    list: (filters: QueryFilters) =>
      [...queryKeys.ports.lists(), { filters }] as const,
    details: () => [...queryKeys.ports.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.ports.details(), id] as const,
  },

  // Cargo Owners
  cargoOwners: {
    all: ['cargoOwners'] as const,
    lists: () => [...queryKeys.cargoOwners.all, 'list'] as const,
    list: (filters: QueryFilters) =>
      [...queryKeys.cargoOwners.lists(), { filters }] as const,
    details: () => [...queryKeys.cargoOwners.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.cargoOwners.details(), id] as const,
  },

  // Shipping Companies
  shippingCompanies: {
    all: ['shippingCompanies'] as const,
    lists: () => [...queryKeys.shippingCompanies.all, 'list'] as const,
    list: (filters: QueryFilters) =>
      [...queryKeys.shippingCompanies.lists(), { filters }] as const,
    details: () => [...queryKeys.shippingCompanies.all, 'detail'] as const,
    detail: (id: string) =>
      [...queryKeys.shippingCompanies.details(), id] as const,
  },

  // Freight Bookings
  freightBookings: {
    all: ['freightBookings'] as const,
    lists: () => [...queryKeys.freightBookings.all, 'list'] as const,
    list: (filters: QueryFilters) =>
      [...queryKeys.freightBookings.lists(), { filters }] as const,
    details: () => [...queryKeys.freightBookings.all, 'detail'] as const,
    detail: (id: string) =>
      [...queryKeys.freightBookings.details(), id] as const,
    quotes: (params: FreightQuoteParams) =>
      [...queryKeys.freightBookings.all, 'quotes', params] as const,
  },
} as const;
