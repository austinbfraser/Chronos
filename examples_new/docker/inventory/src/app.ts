import path from 'path';
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '../../.env') });
import cors from 'cors';
import { NotFoundError, errorHandler } from '@chronosrx/common';
import inventoryRouter from './routes/inventory-router';
import cookieParser from 'cookie-parser';
import eventRouter from './routes/event-router';

import chronosConfig from './chronos-config';
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

chronos.propagate();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5000',
  })
);
app.use(express.json());
app.use(cookieParser());
chronos.docker();

app.use('/api/inventory', inventoryRouter);
app.use('/events', eventRouter);

app.use('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
