// server/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// main.ts (NestJS)
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});

  await app.listen(3000);
}
bootstrap();
