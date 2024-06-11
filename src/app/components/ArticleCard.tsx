import { PhotoIcon, UserIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import Link from 'next/link';
interface IProps {
  data: any;
  className?: string;
}

export default function ArticleCard({ data, className }: IProps) {
  return (
    <div
      className={cx(
        'flex flex-col w-full h-auto aspect-square overflow-hidden rounded-2xl @container min-w-0',
        className && className
      )}
    >
      <div className="relative flex items-center justify-center flex-shrink-0 h-full group">
        <img
          className="w-auto h-full rounded-lg shadow-md mx-auto object-cover transition ease-in-out duration-300"
          alt="Post cover image"
          src={data.eyeCatchImageUrl}
        />
        <div className="absolute inset-0 transition duration-200 bg-gray-700 rounded-2xl opacity-50"></div>
        <div className="absolute inset-0 flex items-end transition duration-200 opacity-100">
          <div className="flex flex-col justify-between flex-1 px-3 pb-3 @xs:px-6 @xs:pb-6 text-white">
            <div className="flex-1">
              <Link className="block group" href={`/posts/${data.slug}`}>
                <span className="px-2 py-1 bg-cool-indigo-500 rounded-lg text-xs">
                  {data.tag || 'nodejs'}
                </span>
                <div className="mt-1 flex items-center justify-between">
                  <h3 className="flex items-center text-sm font-bold leading-5 text-white @xs:text-lg @md:text-2xl @lg:text-3xl">
                    {data.title}
                  </h3>
                </div>
                <p className="hidden @xs:block @lg:mt-5 @lg:text-base mt-1 text-xs text-white">
                  {data.summary}
                </p>
                <div className="flex flex-wrap mt-1 @xs:mt-3 items-center gap-x-3 gap-y-1">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center @lg:w-8 @lg:h-8">
                    <UserIcon className="w-4 h-4 text-gray-500 @lg:w-6 @lg:h-6"></UserIcon>
                  </div>
                  <p className="text-xs font-light @lg:text-sm">
                    {data.author?.username}
                  </p>
                  <p className="text-xs font-light @lg:text-sm">
                    • {new Date(data.createdAt!).toISOString().substring(0, 10)}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ArticleCard.Skeleton = function PostItemSkeleton() {
  return (
    <div className="w-full flex flex-col aspect-square">
      <div className="flex-1 w-full items-center justify-center h-48 mb-4 bg-gray-300 rounded-2xl"></div>
      <div>
        <div className="h-2.5 bg-slate-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-slate-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-slate-200 rounded-full"></div>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 me-3 bg-slate-200 rounded-full"></div>
          <div>
            <div className="h-2.5 bg-slate-200 rounded-full w-32 mb-2"></div>
            <div className="w-48 h-2 bg-slate-200 rounded-full"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};
