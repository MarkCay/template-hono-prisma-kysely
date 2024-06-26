import { getUsers } from '@/data/user/get-users';
import { createRoute, z } from '@hono/zod-openapi';
import { type Handler } from 'hono';
import { userSchema } from './schema';

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  description: 'List of users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(userSchema),
        },
      },
      description: 'Users retrieved successfully',
    },
  },
});

export const getUsersHandler: Handler = async c => {
  const dbClient = c.get('dbClient');
  const users = await getUsers({ dbClient });

  return c.json(users, { status: 200 });
};
