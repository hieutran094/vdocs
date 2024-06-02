'use server';
import { eq } from 'drizzle-orm';
import { object, string } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sign, verify, decode } from '@tsndr/cloudflare-worker-jwt';
import { db } from '@/database';
import { users } from '@/database/schema';
import { hmacPassword } from '@/utils/hmacPassword';

const schema = object({
  email: string().min(1).email(),
  password: string().min(6),
});

const signupSchema = object({
  email: string().min(1).email(),
  password: string().min(6),
  username: string().min(4),
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
    .from(users)
    .where(eq(users.email, validatedFields.data.email))
    .limit(1);

    console.log(loginUser)

  if (!loginUser) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
  const hmacpass = await hmacPassword(validatedFields.data.password);
  if (loginUser.password !== validatedFields.data.password) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
  const token = await sign(
    { exp: Math.floor(Date.now() / 1000) + Number(24) * (60 * 60) },
    process.env.APP_KEY!,
    { algorithm: 'HS256' }
  );

  cookies().set('token', token, {
    httpOnly: true,
  });
  redirect('/dashboard');
}
export async function signup(_currentState: unknown, formData: FormData) {
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

  await db.insert(users).values({
    email,
    username,
    password,
  });
  return {
    success: true,
    message: 'SignUp successfuly. Please try to login.',
  };
}


export async function createPost(_: unknown, formData: FormData) {
  'use server';

  console.log(formData);

  return {
    success: true,
    message: 'Post created successfully',
  };
}