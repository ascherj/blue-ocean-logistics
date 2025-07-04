import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, type QueryFilters } from '../lib/queryClient';
import {
  apiClient,
  type Shipment,
  type PaginatedResponse,
  type ApiResponse,
} from '../lib/api';

// Configuration for API vs Mock mode
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || true; // Default to mock for now

// Mock API functions (fallback for development)
const mockApi = {
  getShipments: async (filters: QueryFilters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock shipment data
    let data: Shipment[] = [
      {
        id: '1',
        trackingNumber: 'OFLP-2024-001',
        status: 'In Transit',
        origin: 'Los Angeles',
        destination: 'Shanghai',
        estimatedArrival: '2024-01-15',
        cargoType: 'Electronics',
        weight: 2500,
        volume: 45,
        containerType: '20ft Standard',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        trackingNumber: 'OFLP-2024-002',
        status: 'Loading',
        origin: 'Hamburg',
        destination: 'New York',
        estimatedArrival: '2024-01-20',
        cargoType: 'Automotive Parts',
        weight: 3200,
        volume: 58,
        containerType: '40ft Standard',
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      {
        id: '3',
        trackingNumber: 'OFLP-2024-003',
        status: 'Delivered',
        origin: 'Singapore',
        destination: 'Rotterdam',
        estimatedArrival: '2024-01-10',
        cargoType: 'Textiles',
        weight: 1800,
        volume: 32,
        containerType: '20ft Standard',
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
      },
    ];

    // Apply basic filtering (mock implementation)
    if (filters.status && typeof filters.status === 'string') {
      data = data.filter(shipment => shipment.status === filters.status);
    }
    if (filters.cargoType && typeof filters.cargoType === 'string') {
      data = data.filter(shipment => shipment.cargoType === filters.cargoType);
    }

    // Return in API response format
    const response: PaginatedResponse<Shipment> = {
      data,
      pagination: {
        page: 1,
        limit: 10,
        total: data.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };

    return response;
  },

  getShipmentById: async (id: string): Promise<Shipment> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      id,
      trackingNumber: `OFLP-2024-${id.padStart(3, '0')}`,
      status: 'In Transit',
      origin: 'Los Angeles',
      destination: 'Shanghai',
      estimatedArrival: '2024-01-15',
      cargoType: 'Electronics',
      weight: 2500,
      volume: 45,
      containerType: '20ft Standard',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };
  },

  createShipment: async (
    shipmentData: Partial<Shipment>
  ): Promise<Shipment> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const now = new Date().toISOString();
    return {
      id: Date.now().toString(),
      trackingNumber: `OFLP-2024-${Date.now().toString().slice(-3)}`,
      status: 'Pending',
      origin: '',
      destination: '',
      estimatedArrival: '',
      cargoType: '',
      createdAt: now,
      updatedAt: now,
      ...shipmentData,
    };
  },
};

// Real API functions
const realApi = {
  getShipments: async (filters: QueryFilters = {}) => {
    const response = await apiClient.shipments.getAll(filters);
    return response;
  },

  getShipmentById: async (id: string) => {
    const response = await apiClient.shipments.getById(id);
    return response.data;
  },

  createShipment: async (shipmentData: Partial<Shipment>) => {
    const response = await apiClient.shipments.create(shipmentData);
    return response.data;
  },
};

// API selector - choose between mock and real API
const selectedApi = USE_MOCK_API ? mockApi : realApi;

// Shipment type definitions (re-export from API types)
export type { Shipment, PaginatedResponse, ApiResponse };

export interface ShipmentDetail extends Shipment {
  route?: {
    ports: string[];
    currentPort: string;
    progress: number;
  };
  timeline?: Array<{
    date: string;
    event: string;
    location: string;
  }>;
}

export interface ShipmentsResponse {
  data: Shipment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Custom hooks using TanStack Query
export function useShipments(filters: QueryFilters = {}) {
  return useQuery({
    queryKey: queryKeys.shipments.list(filters),
    queryFn: () => selectedApi.getShipments(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes for list data
    select: (data): ShipmentsResponse => {
      // Handle both mock and real API response formats
      if ('pagination' in data) {
        // Real API format
        return data as ShipmentsResponse;
      } else {
        // Mock API format - convert to expected format
        return {
          data: data as Shipment[],
          pagination: {
            page: 1,
            limit: 10,
            total: (data as Shipment[]).length,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
        };
      }
    },
  });
}

export function useShipment(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.shipments.detail(id),
    queryFn: () => selectedApi.getShipmentById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for detail data
    select: (data): ShipmentDetail => {
      // Add mock route and timeline data for demo purposes
      return {
        ...data,
        route: {
          ports: ['Los Angeles', 'Long Beach', 'Yokohama', 'Shanghai'],
          currentPort: 'Yokohama',
          progress: 75,
        },
        timeline: [
          {
            date: '2024-01-01',
            event: 'Cargo loaded',
            location: 'Los Angeles',
          },
          {
            date: '2024-01-05',
            event: 'Departed port',
            location: 'Los Angeles',
          },
          {
            date: '2024-01-12',
            event: 'Arrived at port',
            location: 'Yokohama',
          },
        ],
      };
    },
  });
}

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentData: Partial<Shipment>) =>
      selectedApi.createShipment(shipmentData),

    onSuccess: () => {
      // Invalidate and refetch shipments list
      queryClient.invalidateQueries({
        queryKey: queryKeys.shipments.lists(),
      });
    },

    onError: error => {
      console.error('Failed to create shipment:', error);
    },
  });
}

// Health check hook for API connectivity
export function useApiHealth() {
  return useQuery({
    queryKey: ['api', 'health'],
    queryFn: () => apiClient.health.check(),
    enabled: !USE_MOCK_API, // Only check health when using real API
    staleTime: 30 * 1000, // 30 seconds
    retry: 3,
    retryDelay: 1000,
  });
}
