import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 30000; // 30 seconds for logistics operations

// Domain-specific types
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
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  originPortId: string;
  destinationPortId: string;
  distance: number;
  estimatedDuration: number;
  isActive: boolean;
}

export interface Port {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface CargoOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  companyName: string;
}

export interface ShippingCompany {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  fleetSize: number;
}

export interface FreightBooking {
  id: string;
  cargoOwnerId: string;
  shippingCompanyId: string;
  routeId: string;
  status: string;
  bookingDate: string;
  departureDate: string;
  arrivalDate: string;
  totalCost: number;
  currency: string;
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  uptime: number;
  database: {
    connected: boolean;
    responseTime: number;
  };
}

// Request/Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Create Axios instance with default configuration
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    config => {
      // Add timestamp to all requests
      config.headers['X-Request-Time'] = new Date().toISOString();

      // Add correlation ID for request tracking
      config.headers['X-Correlation-ID'] = generateCorrelationId();

      // Add authentication token if available
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (import.meta.env.DEV) {
        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
          {
            headers: config.headers,
            data: config.data,
          }
        );
      }

      return config;
    },
    error => {
      console.error('❌ Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        console.log(
          `✅ API Response: ${response.status} ${response.config.url}`,
          {
            data: response.data,
            headers: response.headers,
          }
        );
      }

      return response;
    },
    (error: AxiosError) => {
      const apiError = handleApiError(error);

      // Log error in development
      if (import.meta.env.DEV) {
        console.error('❌ API Error:', apiError);
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
};

// Error handling utility
const handleApiError = (error: AxiosError): ApiError => {
  const timestamp = new Date().toISOString();

  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      message:
        (data as { message?: string })?.message || `HTTP ${status} Error`,
      status,
      code: (data as { code?: string })?.code,
      details: (data as { details?: unknown })?.details,
      timestamp,
    };
  } else if (error.request) {
    // Network error or no response
    return {
      message: 'Network error - please check your connection',
      status: 0,
      code: 'NETWORK_ERROR',
      details: error.message,
      timestamp,
    };
  } else {
    // Request setup error
    return {
      message: error.message || 'Request configuration error',
      status: 0,
      code: 'REQUEST_ERROR',
      details: error.message,
      timestamp,
    };
  }
};

// Utility functions
const generateCorrelationId = (): string => {
  return `oflp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const getAuthToken = (): string | null => {
  // TODO: Implement token retrieval from localStorage/sessionStorage
  return localStorage.getItem('auth_token');
};

// Create the main API instance
export const api = createApiInstance();

// Specialized API methods for Ocean Freight Logistics Platform
export const apiClient = {
  // Generic HTTP methods
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.get(url, config).then(response => response.data),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => api.post(url, data, config).then(response => response.data),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => api.put(url, data, config).then(response => response.data),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => api.patch(url, data, config).then(response => response.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    api.delete(url, config).then(response => response.data),

  // Logistics-specific methods
  shipments: {
    getAll: (params?: Record<string, unknown>) =>
      apiClient.get<PaginatedResponse<Shipment>>('/shipments', { params }),

    getById: (id: string) =>
      apiClient.get<ApiResponse<Shipment>>(`/shipments/${id}`),

    create: (data: Partial<Shipment>) =>
      apiClient.post<ApiResponse<Shipment>>('/shipments', data),

    update: (id: string, data: Partial<Shipment>) =>
      apiClient.put<ApiResponse<Shipment>>(`/shipments/${id}`, data),

    delete: (id: string) =>
      apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/shipments/${id}`),

    track: (id: string) =>
      apiClient.get<ApiResponse<Shipment & { tracking: unknown }>>(
        `/shipments/${id}/tracking`
      ),
  },

  routes: {
    search: (params: Record<string, unknown>) =>
      apiClient.get<PaginatedResponse<Route>>('/routes/search', { params }),

    getById: (id: string) => apiClient.get<ApiResponse<Route>>(`/routes/${id}`),
  },

  ports: {
    getAll: (params?: Record<string, unknown>) =>
      apiClient.get<PaginatedResponse<Port>>('/ports', { params }),

    getById: (id: string) => apiClient.get<ApiResponse<Port>>(`/ports/${id}`),
  },

  cargoOwners: {
    getAll: (params?: Record<string, unknown>) =>
      apiClient.get<PaginatedResponse<CargoOwner>>('/cargo-owners', { params }),

    getById: (id: string) =>
      apiClient.get<ApiResponse<CargoOwner>>(`/cargo-owners/${id}`),

    create: (data: Partial<CargoOwner>) =>
      apiClient.post<ApiResponse<CargoOwner>>('/cargo-owners', data),
  },

  shippingCompanies: {
    getAll: (params?: Record<string, unknown>) =>
      apiClient.get<PaginatedResponse<ShippingCompany>>('/shipping-companies', {
        params,
      }),

    getById: (id: string) =>
      apiClient.get<ApiResponse<ShippingCompany>>(`/shipping-companies/${id}`),
  },

  freightBookings: {
    getAll: (params?: Record<string, unknown>) =>
      apiClient.get<PaginatedResponse<FreightBooking>>('/freight-bookings', {
        params,
      }),

    getById: (id: string) =>
      apiClient.get<ApiResponse<FreightBooking>>(`/freight-bookings/${id}`),

    create: (data: Partial<FreightBooking>) =>
      apiClient.post<ApiResponse<FreightBooking>>('/freight-bookings', data),

    getQuote: (params: Record<string, unknown>) =>
      apiClient.post<
        ApiResponse<{ quote: number; currency: string; validUntil: string }>
      >('/freight-bookings/quote', params),
  },

  // Health check and system status
  health: {
    check: () => apiClient.get<ApiResponse<HealthStatus>>('/health'),
    status: () => apiClient.get<ApiResponse<HealthStatus>>('/health/status'),
  },
};

// Export types for use in other files
export type { AxiosRequestConfig, AxiosResponse, AxiosError };

// Default export
export default apiClient;
