import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo(): object {
    return {
      name: 'Ocean Freight Logistics Platform API',
      version: '1.0.0',
      description: 'Digital marketplace for maritime transportation',
      endpoints: {
        health: '/api/health',
        cargoOwners: '/api/cargo-owners',
        shippingCompanies: '/api/shipping-companies',
        freightBookings: '/api/freight-bookings',
      },
    };
  }

  getHealthCheck(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
