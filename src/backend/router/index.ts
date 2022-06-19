import * as trpc from '@trpc/server';
import { z } from 'zod';
import { products } from './products';

export const appRouter = trpc.router().merge('products.', products);
