'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import TextInput from '@/app/components/core/TextInput';
import { signup } from '@/app/actions';
import { useAppContext } from '@/app/context/app.context';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import Button from '@/app/components/core/Button';

export const runtime = 'edge';
export default function SignUp() {
  const { setIsLoading } = useAppContext();
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [data, formAction] = useFormState(signup, {
    success: false,
    message: '',
  });
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
    if (data.success) {
      redirect('/login');
    }
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
      <div className="w-full bg-gray-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
            Sign up
          </h1>

          <form className="space-y-4 md:space-y-6" action={formAction}>
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
            <Button onLoading={setIsLoading}>Sign up</Button>
            <p className="text-xs font-light text-gray-500">
              I already have an account.
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline"
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
