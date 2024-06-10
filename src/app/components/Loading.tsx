'use client';

import { useAppContext } from '@/app/context/app.context';

export default function Loading() {
  const { isLoading } = useAppContext();
  return (
    isLoading && (
      <div className="fixed inset-0 bg-transparent z-50 flex items-center justify-center">
        <div className="flex justify-center items-center h-screen">
          <div className="relative inline-flex justify-center items-center w-[80px] h-[80px] bg-gray-800 rounded-2xl text-white">
            <svg
              className="w-10 h-10 animate-spin"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path
                  d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                  opacity=".2"
                />

                <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    )
  );
}
