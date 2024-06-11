import { SignJWT, jwtVerify } from 'jose';
import { LoginUser } from '@/types';

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
  const verified = await jwtVerify(token, new TextEncoder().encode(secret));
  return verified.payload as LoginUser;
};

export const generateToken = async (payload: LoginUser, secret: string) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(secret));
  return token;
};
