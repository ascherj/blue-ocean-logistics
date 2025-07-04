import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global API prefix as specified in PRD
  app.setGlobalPrefix('api');

  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Use port 3001 as specified in PRD
  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log(
    `🚀 Ocean Freight Logistics API is running on: http://localhost:${port}/api`,
  );
}
bootstrap().catch((error) => {
  console.error('❌ Error starting the application:', error);
  process.exit(1);
});
