import { envConfig, isTest } from '@/env';
import { ForbiddenError } from '@/utils/errors';
import { sql } from 'kysely';
import { type DbClient } from './create-db-client';
import { type KyselyTables } from './schema';

export async function deleteAllRecords({
  dbClient,
  tableName,
}: {
  dbClient: DbClient;
  tableName: keyof KyselyTables;
}) {
  if (!isTest()) throw new ForbiddenError('deleteAllRecords can only be used in test environment');
  if (!envConfig.DB_URL.includes('localhost'))
    throw new ForbiddenError('deleteAllRecords can only be used with a local database');
  await sql`TRUNCATE TABLE ${sql.raw(tableName)}`.execute(dbClient);
}
