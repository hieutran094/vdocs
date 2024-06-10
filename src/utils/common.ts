import { decode, verify } from '@tsndr/cloudflare-worker-jwt';

export function formData2Json(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1
        ? formData.getAll(key)
        : formData.get(key),
    ])
  );
}

export const validationToken = async (token: string, secret: string) => {
  const valid = await verify(token, secret);
  if (!valid) throw new Error('Unauthorized');
  const { payload } = decode<{
    id: string;
    username: string;
    email: string;
    role: number;
    imageUrl: string;
  }>(token);
  return payload;
};
