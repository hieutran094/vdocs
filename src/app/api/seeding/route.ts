import { db } from '@/database';
import { categoryTable, userTable } from '@/database/schema';
import { hmacPassword } from '@/utils/hmacPassword';

export const runtime = 'edge';
export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.APP_KEY) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Unauthorized',
      }),
      {
        status: 401,
      }
    );
  }
  const password = await hmacPassword(
    process.env.SUPER_ADMIN_PASSWORD + process.env.APP_KEY
  );
  await db
    .insert(userTable)
    .values({
      email: 'admin@example.com',
      username: 'Admin',
      password,
    })
    .onConflictDoNothing();
  await db
    .insert(categoryTable)
    .values([
      { title: 'NodeJs', slug: 'nodejs' },
      { title: 'Javascript', slug: 'javascript' },
      { title: 'Docker', slug: 'docker' },
      { title: 'Testing', slug: 'testing' },
      { title: 'Golang', slug: 'golang' },
    ])
    .onConflictDoNothing();
  return Response.json({ success: true, message: 'Success' });
}
