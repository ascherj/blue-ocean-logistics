import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiInfo(): object {
    return this.appService.getApiInfo();
  }

  @Get('health')
  getHealthCheck(): object {
    return this.appService.getHealthCheck();
  }
}
