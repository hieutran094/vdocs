'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import TextInput from '@/app/components/core/TextInput';
import { login } from '@/app/actions';
import { useAppContext } from '@/app/context/app.context';
import Button from '@/app/components/core/Button';

export const runtime = 'edge';
export default function Login() {
  const { setIsLoading } = useAppContext();
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [data, formAction] = useFormState(login, {
    success: false,
    message: '',
  });
  const { email, password } = state;

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
          <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-700 md:text-xl">
            Sign in
          </h1>

          <form className="space-y-4 md:space-y-6" action={formAction}>
            <TextInput
              name="email"
              label="Email"
              value={email}
              placeholder="name@gmail.com"
              autoComplete="username"
              errorMessage={data?.errors?.email}
              onChange={handlerInputChange}
            ></TextInput>
            <TextInput
              name="password"
              label="Password"
              value={password}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              errorMessage={data?.errors?.password}
              onChange={handlerInputChange}
            ></TextInput>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <Button onLoading={setIsLoading}>Sign in</Button>
            <p className="text-xs font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <Link
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
