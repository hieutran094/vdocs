import {
  TagIcon,
  UserIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/16/solid';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOnePost } from '@/app/actions';

export const runtime = 'edge';

export default async function PostDetail({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const id = searchParams?.['id'];
  const post = await getOnePost(id || '');

  if (!post) {
    notFound();
  }
  return (
    <>
      <div className="max-w-lg px-4 pt-5 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
        <div className="relative max-w-2xl mx-auto">
          <div className="flex justify-center items-center space-x-3 text-gray-500 dark:text-gray-400"></div>
          <div className="text-center">
            <h1 className="text-gray-800 pt-4 dark:text-white font-bold text-2xl md:text-3xl lg:text-4xl">
              {post.title}
            </h1>
          </div>
          <div className="flex justify-center items-center pt-3 space-x-3 text-gray-500 dark:text-gray-400">
            <a
              aria-current="page"
              href="/"
              className="router-link-active router-link-exact-active flex items-center p-0.5 pr-2 gap-2 text-sm w-max"
            >
              <span className="p-1 rounded-full bg-primary">
                <UserIcon className="w-5 h-5 text-white"></UserIcon>
              </span>
              By Admin
            </a>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <time className="truncate text-sm">October 21, 2023</time>
            <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/"
              className="router-link-active router-link-exact-active flex items-center text-sm w-max"
            >
              <TagIcon className="w-3"></TagIcon> NodeJs
            </Link>
          </div>
          <div className="flex justify-center pt-10">
            <img
              src={post.eyeCatchImageUrl || ''}
              alt="Cover image"
              data-nuxt-img=""
              className="w-full aspect-video object-cover rounded-2xl"
            />
          </div>
          <div
            className="pt-10 text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          ></div>
          <div className="flex justify-between items-center py-10">
            <Link
              href="/"
              className="inline-flex text-sm items-center font-medium text-primary bg-transparent px-4 py-2"
            >
              <ChevronDoubleLeftIcon className="w-5 h-5 mr-1"></ChevronDoubleLeftIcon>
              View another post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
