import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PinoLoggerService } from './logger/pino-logger.service';
import { withTraceId } from './middlewares/withTraceId';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.use(withTraceId(app));
  app.useLogger(app.get(PinoLoggerService));
  await app.listen(3000);
}

bootstrap();
