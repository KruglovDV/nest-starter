import { NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from '../logger/logger.constants';
import { INestApplication } from '@nestjs/common';

export const withTraceId =
  (app: INestApplication) => (req: any, _res: any, next: NextFunction) => {
    const traceId = req.headers['x-request-id'] || uuidv4();
    const store = new Map().set('traceId', traceId);
    const asyncStorage =
      app.get<AsyncLocalStorage<Map<string, string>>>(ASYNC_STORAGE);
    asyncStorage.run(store, () => {
      next();
    });
  };
