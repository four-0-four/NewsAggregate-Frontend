import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from '../../components/Inputs/Input'; // Adjust the path according to your file structure
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'; // Adjust the import path
import PasswordInput from '../../components/Inputs/PasswordInput'; // Adjust the path according to your file structure

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username: formData.username, password: formData.password })).unwrap().then(() => {
            router.push('/');
        })
    };

    return (
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36 px-2 sm:px-10">
            <Box title="Login" size="small">
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                    <Input headerText="Username/Email" placeholder="Username/Email" name="username" value={formData.username} onChange={handleChange} />

                    <PasswordInput headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    <div className='text-right text-dark-gray mt-1'>
                        <Link href="/auth/ForgetPassword" className='cursor-pointer'>forget password?</Link>
                    </div>

                    <div className="mt-5 flex flex-col md:flex-row justify-between items-center w-full">
                        <p className="text-xs md:text-sm order-2 md:order-1">
                            Doesn&apos;t Have an Account?
                            <Link href="/auth/Register" className="text-primary"> Register</Link>
                        </p>
                        <PrimaryButton type="submit" text="Login" disabled={status === 'loading'} />
                    </div>
                </form>
            </Box>
        </div>
    );
}

import nookies from "nookies";
import { GetServerSideProps } from "next";
import Link from 'next/link';
import { loginUser } from '../../lib/features/user/thunks';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Box from '@/components/Box/Box';
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check authentication (e.g., check cookies or token)
  const cookies = nookies.get(context);
  const token = cookies['access_token'];
  const refresh_token = cookies['refresh_token'];
  if (token && refresh_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default LoginForm;
