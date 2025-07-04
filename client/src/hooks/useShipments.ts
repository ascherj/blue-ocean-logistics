import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, type QueryFilters } from '../lib/queryClient';

// Mock API functions (to be replaced with real API calls later)
const mockApi = {
  getShipments: async (filters: QueryFilters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock shipment data
    let data = [
      {
        id: '1',
        trackingNumber: 'OFLP-2024-001',
        status: 'In Transit',
        origin: 'Los Angeles',
        destination: 'Shanghai',
        estimatedArrival: '2024-01-15',
        cargoType: 'Electronics',
      },
      {
        id: '2',
        trackingNumber: 'OFLP-2024-002',
        status: 'Loading',
        origin: 'Hamburg',
        destination: 'New York',
        estimatedArrival: '2024-01-20',
        cargoType: 'Automotive Parts',
      },
      {
        id: '3',
        trackingNumber: 'OFLP-2024-003',
        status: 'Delivered',
        origin: 'Singapore',
        destination: 'Rotterdam',
        estimatedArrival: '2024-01-10',
        cargoType: 'Textiles',
      },
    ];

    // Apply basic filtering (mock implementation)
    if (filters.status && typeof filters.status === 'string') {
      data = data.filter(shipment => shipment.status === filters.status);
    }
    if (filters.cargoType && typeof filters.cargoType === 'string') {
      data = data.filter(shipment => shipment.cargoType === filters.cargoType);
    }

    return {
      data,
      total: data.length,
      page: 1,
      limit: 10,
    };
  },

  getShipmentById: async (id: string) => {
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
      route: {
        ports: ['Los Angeles', 'Long Beach', 'Yokohama', 'Shanghai'],
        currentPort: 'Yokohama',
        progress: 75,
      },
      timeline: [
        { date: '2024-01-01', event: 'Cargo loaded', location: 'Los Angeles' },
        { date: '2024-01-05', event: 'Departed port', location: 'Los Angeles' },
        { date: '2024-01-12', event: 'Arrived at port', location: 'Yokohama' },
      ],
    };
  },

  createShipment: async (shipmentData: Record<string, unknown>) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      id: Date.now().toString(),
      trackingNumber: `OFLP-2024-${Date.now().toString().slice(-3)}`,
      ...shipmentData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
  },
};

// Shipment type definitions
export interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  estimatedArrival: string;
  cargoType: string;
  weight?: number;
  volume?: number;
  containerType?: string;
}

export interface ShipmentDetail extends Shipment {
  route: {
    ports: string[];
    currentPort: string;
    progress: number;
  };
  timeline: Array<{
    date: string;
    event: string;
    location: string;
  }>;
}

export interface ShipmentsResponse {
  data: Shipment[];
  total: number;
  page: number;
  limit: number;
}

// Custom hooks using TanStack Query
export function useShipments(filters: QueryFilters = {}) {
  return useQuery({
    queryKey: queryKeys.shipments.list(filters),
    queryFn: () => mockApi.getShipments(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes for list data
    select: (data): ShipmentsResponse => data,
  });
}

export function useShipment(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.shipments.detail(id),
    queryFn: () => mockApi.getShipmentById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes for detail data
    select: (data): ShipmentDetail => data,
  });
}

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentData: Record<string, unknown>) =>
      mockApi.createShipment(shipmentData),

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
