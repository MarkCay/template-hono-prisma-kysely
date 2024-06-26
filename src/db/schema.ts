import { type products, type users } from '@prisma/client';
import { type ColumnType, type Generated } from 'kysely';

export interface Tables {
  users: users;
  products: products;
}

export interface KyselyTables {
  users: OverrideKyselyCommonField<users>;
  products: OverrideKyselyCommonField<products>;
}

type OverrideKyselyCommonField<T> = Omit<T, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> & {
  id: Generated<string>;
  created_at: ColumnType<Date, Date | string | undefined, never>;
  updated_at: ColumnType<
    Date | null,
    Date | string | undefined | null,
    Date | string | undefined | null
  >;
  deleted_at: ColumnType<
    Date | null,
    Date | string | undefined | null,
    Date | string | undefined | null
  >;
};
