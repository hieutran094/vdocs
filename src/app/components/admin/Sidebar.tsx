'use client';

import {
  HomeIcon,
  XMarkIcon,
  NewspaperIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import cx from 'classnames';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/app/context/app.context';

const routes = [
  {
    name: 'Dashboard',
    icon: <HomeIcon className="h-6 w-6"></HomeIcon>,
    path: '/dashboard',
  },
  {
    name: 'Posts',
    icon: <NewspaperIcon className="h-6 w-6"></NewspaperIcon>,
    path: '/dashboard/posts',
  },
  {
    name: 'Profile',
    icon: <UserIcon className="h-6 w-6"></UserIcon>,
    path: '/dashboard/profile',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpenSidebar, setIsOpenSidebar } = useAppContext();

  return (
    <div
      className={cx(
        'w-[292px] sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 -translate-x-96 xl:translate-x-0',
        isOpenSidebar && '!translate-x-0'
      )}
    >
      <span className="absolute top-3 right-3">
        <XMarkIcon
          onClick={() => setIsOpenSidebar(false)}
          className="w-5 h-5 cursor-pointer text-gray-500 xl:hidden"
        ></XMarkIcon>
      </span>
      <div className="mx-[50px] mt-[50px] flex items-center justify-center">
        <Link
          className="font-black font-display text-cool-indigo-800 text-3xl"
          href="/"
        >
          <span className="inline-block">
            Dev<span className="text-cool-indigo-600">Docs</span>
          </span>
        </Link>
      </div>
      <div className="mt-[24px] mb-7 h-px bg-gray-300"></div>
      <ul className="mb-auto pt-1">
        {routes.map((route, index) => {
          return (
            <a href={route.path} key={index}>
              <div className="relative mt-2 mb-5 flex hover:cursor-pointer">
                <li className="my-[3px] flex cursor-pointer items-center px-8">
                  <span
                    className={cx(
                      'text-gray-400',
                      pathname === route.path && '!text-cool-indigo-500'
                    )}
                  >
                    {route.icon}
                  </span>
                  <p className="leading-1 flex ms-4 font-medium text-gray-500">
                    {route.name}
                  </p>
                </li>
                {pathname === route.path && (
                  <div className="absolute top-px h-9 w-1 rounded-lg bg-cool-indigo-500 end-0"></div>
                )}
              </div>
            </a>
          );
        })}
      </ul>
    </div>
  );
}
