import { validationToken } from '@/utils/common';
import { cookies } from 'next/headers';

export const checkAuth = async () => {
  const token = cookies().get('token');

  if (!token?.value) {
    throw new Error('Unauthorized');
  }
  return await validationToken(token.value, process.env.APP_KEY!);
};
