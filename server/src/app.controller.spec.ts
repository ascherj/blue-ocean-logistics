import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API info', () => {
      const result = appController.getApiInfo();
      expect(result).toHaveProperty(
        'name',
        'Ocean Freight Logistics Platform API',
      );
      expect(result).toHaveProperty('version', '1.0.0');
    });
  });

  describe('health', () => {
    it('should return health check', () => {
      const result = appController.getHealthCheck();
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('timestamp');
    });
  });
});
