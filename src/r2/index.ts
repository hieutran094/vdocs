import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function initR2Bucket() {
  if (process.env.NODE_ENV === 'development') {
    const { env } = getRequestContext();
    return env.BUCKET;
  }

  return process.env.BUCKET as unknown as R2Bucket;
}

export const r2 = initR2Bucket();

export function getFileExtension(fileName: string) {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 1);
}
