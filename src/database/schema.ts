import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { ulid } from 'ulidx';

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => ulid()),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password'),
});
