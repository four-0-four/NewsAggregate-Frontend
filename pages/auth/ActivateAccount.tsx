import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from '../../components/Input';
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { confirmResetToken, changePassword, confirmRegistrationToken, loginUser } from '../../lib/features/user/thunks'; // Adjust the import path

const ChangePasswordForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Validate token before page loads
    useEffect(() => {
        // Check if the token is available in the query and update the stat
        if (router.query.token && typeof router.query.token === 'string') {
            const token = router.query.token;
            dispatch(confirmRegistrationToken({ token: token as string })).unwrap()
                .then(() => {
                    setIsConfirmed(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsConfirmed(false);
                    setIsLoading(false);
                });
        }
    }, [router.query]);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username: formData.username, password: formData.password }))
            .unwrap()
            .then(() => {
                router.push('/'); // Redirect to homepage on success
            })
    };


    if (!isLoading && !isConfirmed) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold uppercase">Something Wrong Happened</h1>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36">
            <form onSubmit={handleSubmit} className="w-full px-4 md:w-full lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-6 rounded-[25px] border border-light-gray">
                <h1 className={`text-xl md:text-2xl font-bold text-center uppercase pb-4 ${(status === 'succeeded' || status === 'failed')?"mb-1":"mb-4"} border-b border-light-gray`}>Your Account is Activated</h1>
                {status === 'failed' && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                <Input headerText="Username/Email" placeholder="Username/Email" name="username" value={formData.username} onChange={handleChange} />

                <Input headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center w-full">
                    <button className="w-full md:w-auto px-12 py-2 bg-primary text-black rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

import nookies from "nookies";
import { GetServerSideProps } from "next";
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

export default ChangePasswordForm;
