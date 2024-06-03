'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import Link from 'next/link';
import TextInput from '@/app/components/core/TextInput';
import { signup } from '@/app/actions';

export const runtime = 'edge';
export default function SignUp() {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [data, dispatch] = useFormState(signup, undefined);
  const { email, username, password } = state;

  const handlerInputChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  useEffect(() => {
    if (data?.message) {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  }, [data]);

  return (
    <>
      <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
            Sign up
          </h1>

          <form className="space-y-4 md:space-y-6" action={dispatch}>
            <TextInput
              name="email"
              label="Email"
              value={email}
              placeholder="name@gmail.com"
              errorMessage={data?.errors?.email}
              onChange={handlerInputChange}
            ></TextInput>
            <TextInput
              name="username"
              label="Username"
              value={username}
              placeholder=""
              errorMessage={data?.errors?.username}
              onChange={handlerInputChange}
            ></TextInput>
            <TextInput
              name="password"
              label="Password"
              value={password}
              placeholder="••••••••"
              type="password"
              errorMessage={data?.errors?.password}
              onChange={handlerInputChange}
            ></TextInput>
            <button
              type="submit"
              className="w-full text-white bg-cool-indigo-600 hover:bg-cool-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign up
            </button>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              I already have an account.
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Try login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
