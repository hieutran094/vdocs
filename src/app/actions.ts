'use server';
import { and, count, eq, inArray } from 'drizzle-orm';
import zod, { object, string, any, number } from 'zod';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { sign, verify, decode } from '@tsndr/cloudflare-worker-jwt';
import { ulid } from 'ulidx';
import { db } from '@/database';
import {
  categoryTable,
  postCategoryTable,
  postTable,
  userTable,
} from '@/database/schema';
import { hmacPassword } from '@/utils/hmacPassword';
import { getFileExtension, r2 } from '@/r2';
import { formData2Json, validationToken } from '@/utils/common';
import { checkAuth } from '@/libs/auth';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const baseQuerySchema = object({
  limit: number().min(1).max(100).optional().default(10),
  page: number().min(1).optional().default(1),
});

type BaseScheme = zod.infer<typeof baseQuerySchema>;

const schema = object({
  email: string().min(1).email(),
  password: string().min(6),
});

const signupSchema = object({
  email: string().min(1).email(),
  password: string().min(6),
  username: string().min(4),
});

const createPostSchema = object({
  title: string().min(1),
  slug: string().min(1),
  metaTitle: string(),
  summary: string(),
  content: string().min(1),
  categoryIds: string().array().min(1),
  eyeCatchImageFile: any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

const updatePostSchema = createPostSchema
  .omit({ categoryIds: true })
  .partial()
  .extend({
    id: string().ulid(),
  });

export async function login(_currentState: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const [loginUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, validatedFields.data.email))
    .limit(1);

  if (!loginUser) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
  const hmacpass = await hmacPassword(
    validatedFields.data.password + process.env.APP_KEY
  );
  if (loginUser.password !== hmacpass) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
  const { username, email, id, role, imageUrl } = loginUser;
  const token = await sign(
    {
      exp: Math.floor(Date.now() / 1000) + Number(24) * (60 * 60),
      username,
      email,
      id,
      role,
      imageUrl,
    },
    process.env.APP_KEY!,
    { algorithm: 'HS256' }
  );

  cookies().set('token', token, {
    httpOnly: true,
  });
  redirect('/dashboard');
}
export async function signup(_currentState: unknown, formData: FormData) {
  try {
    const validatedFields = signupSchema.safeParse({
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password, username } = validatedFields.data;
    const hmacpass = await hmacPassword(password + process.env.APP_KEY);
    await db.insert(userTable).values({
      email,
      username,
      password: hmacpass,
    });
    return {
      success: true,
      message: 'SignUp successfuly. Please try to login.',
    };
  } catch (e) {
    return {
      success: false,
      message: 'Internal Server Error',
    };
  }
}

export async function getAllCategory() {
  return await db.select().from(categoryTable).all();
}
export async function searchCategory(query: BaseScheme) {
  const categories = await db
    .select()
    .from(categoryTable)
    .limit(query.limit)
    .offset(query.limit * (query.page - 1));
  if (categories.length === 0) return [];
  const categoryPosts = await db
    .select({
      categoryId: postCategoryTable.categoryId,
      postCount: count(postCategoryTable.postId),
    })
    .from(postCategoryTable)
    .where(
      inArray(
        postCategoryTable.categoryId,
        categories.map((el) => el.id)
      )
    )
    .groupBy(postCategoryTable.categoryId);

  const categoryPostsMap = new Map(
    categoryPosts.map((i) => [i.categoryId, i.postCount])
  );

  return categories.map((el) => {
    const totalPost = categoryPostsMap.get(el.id) || 0;
    return {
      ...el,
      totalPost,
    };
  });
}

export async function createPost(_: unknown, formData: FormData) {
  try {
    const loginUser = await checkAuth();

    if (!loginUser) {
      throw new Error('You must be signed in to perform this action');
    }
    const jsonData = formData2Json(formData);

    const validatedFields = createPostSchema.safeParse(jsonData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { data } = validatedFields;

    const uuid = crypto.randomUUID();
    const raw = await data.eyeCatchImageFile.arrayBuffer();
    const { name, type } = data.eyeCatchImageFile;
    const extension = getFileExtension(name);
    const r2Object = await r2.put('/blog/images' + uuid + extension, raw, {
      httpMetadata: { contentType: type },
    });
    try {
      delete data.eyeCatchImageFile;
      const id = ulid();
      const postCategories = data.categoryIds.map((categoryId) => ({
        postId: id,
        categoryId,
      }));
      const postInsertQuery = db.insert(postTable).values({
        ...data,
        id,
        authorId: loginUser.id,
        eyeCatchImageUrl: r2Object.key,
      });
      const postCategoriesQuery = db
        .insert(postCategoryTable)
        .values(postCategories);
      await db.batch([postInsertQuery, postCategoriesQuery]);
    } catch (err) {
      await r2.delete(r2Object.key);
      throw err;
    }

    return {
      success: true,
      message: 'Create new post successfully',
    };
  } catch (e) {
    const { message } = e as unknown as Error;
    return {
      success: false,
      message: message || 'Internal Server Error',
    };
  }
}
export async function updatePost(_: unknown, formData: FormData) {
  try {
    const loginUser = await checkAuth();

    if (!loginUser) {
      throw new Error('You must be signed in to perform this action');
    }
    const file = formData.get('eyeCatchImageFile') as File;
    if (!(file && file['size'] > 0)) {
      formData.delete('eyeCatchImageFile');
    }
    const jsonData = formData2Json(formData);

    const validatedFields = updatePostSchema.safeParse(jsonData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { data } = validatedFields;

    const postId = data.id;
    let r2Object;
    if (data.eyeCatchImageFile) {
      const uuid = crypto.randomUUID();
      const raw = await data.eyeCatchImageFile.arrayBuffer();
      const { name, type } = data.eyeCatchImageFile;
      const extension = getFileExtension(name);
      r2Object = await r2.put('/blog/images' + uuid + extension, raw, {
        httpMetadata: { contentType: type },
      });
    }

    try {
      delete data.eyeCatchImageFile;
      const postInsertQuery = db
        .update(postTable)
        .set({
          ...data,
          ...(r2Object ? { eyeCatchImageUrl: r2Object.key } : {}),
        })
        .where(eq(postTable.id, postId));
      await db.batch([postInsertQuery]);
    } catch (err) {
      if (r2Object) await r2.delete(r2Object.key);
      throw err;
    }

    return {
      success: true,
      message: 'Update post successfully',
    };
  } catch (e) {
    const { message } = e as unknown as Error;
    return {
      success: false,
      message: message || 'Internal Server Error',
    };
  }
}
export async function getOnePost(id: string) {
  const [post] = await db
    .select()
    .from(postTable)
    .where(eq(postTable.id, id))
    .limit(1);
  if (!post) {
    return notFound();
  }
  const postCategories = await db.query.postCategoryTable.findMany({
    with: {
      category: true,
    },
    where: eq(postCategoryTable.postId, id),
  });
  return {
    ...post,
    categories: postCategories.map((el) => el.category),
  };
}
export async function deleteOnPost(id: string) {
  try {
    const loginUser = await checkAuth();

    if (!loginUser) {
      throw new Error('You must be signed in to perform this action');
    }
    await db.delete(postTable).where(eq(postTable.id, id));
    return {
      success: true,
      message: 'Delete successfuly.',
    };
  } catch (e) {
    const { message } = e as unknown as Error;
    return {
      success: false,
      message: message || 'Internal Server Error',
    };
  }
}
export async function getAllPost() {
  return await db.select().from(postTable).all();
}
