import { InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  foreignKey,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { ulid } from 'ulidx';
import { EUserRole } from '@/enums';

export const userTable = sqliteTable(
  'user',
  {
    id: text('id')
      .primaryKey()
      .$default(() => ulid()),
    username: text('username').notNull(),
    email: text('email').notNull(),
    password: text('password'),
    role: integer('role').default(EUserRole.CUSTOMER),
    imageUrl: text('image_url'),
  },
  (user) => ({
    emailIdx: uniqueIndex('user_email_idx').on(user.email),
    usernameIdx: uniqueIndex('user_username_idx').on(user.username),
  })
);

export type User = InferSelectModel<typeof userTable>;

export const categoryTable = sqliteTable(
  'category',
  {
    id: text('id')
      .primaryKey()
      .$default(() => ulid()),
    parentId: text('parent_id'),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    metaTitle: text('meta_title'),
    content: text('content'),
  },
  (table) => ({
    slugIdx: uniqueIndex('category_slug_idx').on(table.slug),
  })
);

export const postTable = sqliteTable(
  'post',
  {
    id: text('id')
      .primaryKey()
      .$default(() => ulid()),
    authorId: text('author_id'),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    metaTitle: text('meta_title'),
    summary: text('summary'),
    content: text('content'),
    eyeCatchImageUrl: text('eye_catch_image_url'),
    published: integer('published').default(0),
    publishedAt: integer('published', {
      mode: 'timestamp_ms',
    }),
    deleteFlag: integer('delete_flag').default(0),
    createdAt: integer('created_at', {
      mode: 'timestamp_ms',
    }).default(sql`current_timestamp`),
    updatedAt: integer('updated_at', {
      mode: 'timestamp_ms',
    })
      .default(sql`current_timestamp`)
      .$onUpdateFn(() => new Date()),
  },
  (table) => ({
    slugIdx: uniqueIndex('post_slug_idx').on(table.slug),
    userReference: foreignKey({
      columns: [table.authorId],
      foreignColumns: [userTable.id],
      name: 'post_author_fk',
    }).onDelete('cascade'),
  })
);

export type Post = InferSelectModel<typeof postTable> & {
  author: {
    username: string;
  } | null;
};

export const postRelations = relations(postTable, ({ one }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
  }),
}));

export const postCategoryTable = sqliteTable(
  'post_category',
  {
    postId: text('post_id').notNull(),
    categoryId: text('category_id').notNull(),
  },
  (table) => ({
    postReference: foreignKey({
      columns: [table.postId],
      foreignColumns: [postTable.id],
    }).onDelete('cascade'),
    categoryReference: foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categoryTable.id],
    }).onDelete('cascade'),
    pk: primaryKey({ columns: [table.postId, table.categoryId] }),
  })
);

export const postCategoryRelations = relations(
  postCategoryTable,
  ({ one }) => ({
    post: one(postTable, {
      fields: [postCategoryTable.postId],
      references: [postTable.id],
    }),
    category: one(categoryTable, {
      fields: [postCategoryTable.categoryId],
      references: [categoryTable.id],
    }),
  })
);
