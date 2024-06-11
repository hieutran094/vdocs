'use client';
import {
  BellAlertIcon,
  Bars3Icon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import cx from 'classnames';
import { useAppContext } from '@/app/context/app.context';
import { logout } from '@/app/actions';

export default function Header() {
  const { setIsLoading } = useAppContext();
  const { isOpenSidebar, setIsOpenSidebar, loginUser } = useAppContext();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-end rounded-xl bg-white/20 p-2 backdrop-blur-xl">
      <div className="relative mt-[3px] flex h-[56px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full w-full items-center rounded-full bg-gray-50 text-gray-700">
          <p className="pl-3 pr-2 text-xl">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400"></MagnifyingGlassIcon>
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-gray-50 text-sm font-medium text-gray-700 outline-none placeholder:!text-gray-400 sm:w-fit"
          />
        </div>
        <span
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
          className="flex cursor-pointer text-xl text-gray-600 xl:hidden"
        >
          <Bars3Icon className="h-5 w-5"></Bars3Icon>
        </span>
        <div className="relative flex">
          <div className="flex">
            <p className="cursor-pointer">
              <BellAlertIcon className="h-4 w-4 text-gray-600"></BellAlertIcon>
            </p>
          </div>
        </div>
        <div className="relative flex">
          <div className="flex">
            <UserCircleIcon
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="h-8 w-8 text-gray-400 cursor-pointer"
            ></UserCircleIcon>
          </div>
          <div
            className={cx(
              'py-2 top-8 -left-[180px] w-max absolute z-10 origin-top-right transition-all duration-300 ease-in-out scale-0',
              isOpenMenu && '!scale-100'
            )}
          >
            <div className="flex h-auto w-56 flex-col justify-start rounded-xl bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 ">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-600">
                    👋 Hey, {loginUser?.username}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200"></div>
              <div className="my-3 ml-4 flex flex-col gap-y-3">
                <button className="py-0.5 text-start text-sm text-gray-700">
                  Profile Settings
                </button>
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    await logout();
                    setIsLoading(false);
                  }}
                  className="py-0.5 text-start text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
