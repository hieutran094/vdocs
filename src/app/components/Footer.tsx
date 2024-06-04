import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Footer() {
  const quickLink = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Blog',
      link: '/',
    },
    {
      name: 'Pages',
      link: '/',
    },
    {
      name: 'Contact',
      link: '/',
    },
    {
      name: 'Admin channel',
      link: '/dashboard',
    },
  ];
  return (
    <>
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:pt-16 lg:px-8">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-6">
            <div className="md:pr-16">
              <h3 className="text-md font-semibold text-gray-700">About</h3>
              <p className="mt-3 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </p>
              <p className="mt-5 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Email: </span>
                devdocs@gmail.com
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Phone: </span>
                +84987654321
              </p>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <h3 className="text-md font-semibold text-gray-700">
                  Quick Link
                </h3>
                <ul className="mt-5 text-sm text-gray-600">
                  {quickLink.map((item, index) => (
                    <Link href={item.link}>
                      <li key={index} className="py-1">
                        {item.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-700">
                  Category
                </h3>
                <ul className="mt-5 text-sm text-gray-600">
                  {[1, 2, 3, 4].map((_, index) => (
                    <li key={index} className="py-1">
                      Home
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="">
              <div className="p-6 rounded-2xl bg-white text-center">
                <h3 className="text-md font-semibold text-gray-700">
                  Weekly Newsletter
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  Get blog articles and offers via email
                </p>
                <div className="relative mt-5">
                  <input
                    placeholder="Your email"
                    className="w-full px-3.5 py-3 text-sm text-gray-700 rounded-full border border-gray-200 font-normal outline-none transition duration-150 focus:border-indigo-600 active:border-indigo-600"
                  ></input>
                  <div className="absolute inset-y-0 flex items-center top-0 right-0 pr-3.5">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400"></EnvelopeIcon>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center px-4 py-3 text-sm text-white transition duration-300 ease-in-out rounded-full outline-none bg-cool-indigo-600 md:px-6 sm:font-medium hover:bg-cool-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-6 border-t border-gray-200">
            <p className="text-sm text-gray-400 md:mt-0 md:order-1">
              © 2024 TranHieu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
