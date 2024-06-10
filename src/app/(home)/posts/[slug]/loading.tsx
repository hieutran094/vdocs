import { PhotoIcon } from '@heroicons/react/24/outline';

export default function Loading() {
  return (
    <div className="max-w-lg px-4 pt-5 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
      <div className="animate-pulse file:relative max-w-2xl mx-auto">
        <div className="flex justify-center items-center space-x-3 text-gray-500 dark:text-gray-400"></div>
        <div className="text-center pt-4">
          <div className="h-10 bg-slate-200 rounded"></div>
        </div>
        <div className="flex justify-center items-center pt-3 space-x-3 text-gray-500 dark:text-gray-400">
          <div className="rounded-full bg-slate-200 h-8 w-8"></div>
          <div className="h-2 bg-slate-200 rounded w-12"></div>
          <div className="h-2 bg-slate-200 rounded w-64"></div>
        </div>
        <div className="flex justify-center pt-10">
          <div className="w-full flex items-center justify-center aspect-video object-cover rounded-2xl bg-slate-200 ">
            <PhotoIcon className="w-36 h-36 text-gray-50"></PhotoIcon>
          </div>
        </div>
        <div className="pt-10 pb-10 text-gray-700">
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-fullmax-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-ful max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
