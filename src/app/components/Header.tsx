'use client';
import {
  Bars3Icon,
  EnvelopeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import cx from 'classnames';

export default function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="relative mt-16 overflow-hidden md:mt-18 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative pb-4">
        <nav className="backdrop-filter backdrop-blur-xl border-b border-slate-900/5 z-10 bg-gray-50/90 fixed top-0 w-full">
          <div className="px-2 mx-auto max-w-screen-xl sm:px-4 lg:px-8">
            <div className="flex justify-between h-16 md:h-18">
              <div className="flex px-2 lg:px-0">
                <div className="flex items-center flex-shrink-0">
                  <Link
                    className="inline-flex items-center font-black font-display text-cool-indigo-800 text-xl"
                    href="/"
                  >
                    <img
                      className="h-9 w-auto md:h-10"
                      alt="logo"
                      src="/images/text-logo.webp"
                    />
                  </Link>
                </div>
                <div
                  className="hidden lg:ml-10 xl:ml-12 lg:flex lg:space-x-8"
                  data-turbo="false"
                >
                  <a
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    href="/"
                  >
                    Home
                  </a>
                  <a
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    href="/?type=template"
                  >
                    Blog
                  </a>
                  <a
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    href="/?type=kit"
                  >
                    Pages
                  </a>
                  <a
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    href="/?price=free"
                  >
                    Contact
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-end flex-1 px-2 sm:justify-center lg:ml-6 lg:justify-end">
                <div className="relative hidden w-full h-12 max-w-lg rounded-full sm:block">
                  <form target="_blank" action="" method="get">
                    <input type="hidden" />
                    <input type="hidden" />
                    <input type="hidden" />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400"></EnvelopeIcon>
                    </div>
                    <input
                      className="w-full pl-10 pr-24 py-3.5 border-0 bg-gray-100 border-transparent rounded-full leading-5 transition duration-150 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-cool-indigo-200 sm:text-sm"
                      data-newsletter-target="email"
                      placeholder="Get notified when we have new posts"
                      autoComplete="email"
                      type="email"
                    />
                    <button
                      type="submit"
                      className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-300 ease-in-out rounded-full outline-none right-1 top-1 bg-primary md:px-6 sm:font-medium hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm leading-4 text-white border border-transparent rounded-full shadow-sm sm:hidden bg-primary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500"
                >
                  <EnvelopeIcon className="-ml-0.5 mr-2 h-4 w-4"></EnvelopeIcon>
                  Get new post
                </button>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 ml-3 text-gray-400 rounded-full lg:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  onClick={() => setOpenSidebar(!openSidebar)}
                >
                  <span className="sr-only">Open main menu</span>
                  {!openSidebar ? (
                    <Bars3Icon className="w-6 h-6" />
                  ) : (
                    <XMarkIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={cx(
              !openSidebar && 'hidden',
              'lg:hidden bg-white/90 backdrop-filter backdrop-blur-xl'
            )}
          >
            <div className="px-2 pt-2 pb-3">
              <a
                className="block px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                href="/"
              >
                Home
              </a>
              <a
                className="block px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                href="/?type=template"
              >
                Blog
              </a>
              <a
                className="block px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                href="/?type=kit"
              >
                Pages
              </a>
              <a
                className="block px-3 py-2 rounded-2lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                href="/?price=free"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
