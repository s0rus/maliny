import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

export const products = trpc.router().query('get-all', {
  resolve: async () => {
    return await prisma.product.findMany();
  },
});
