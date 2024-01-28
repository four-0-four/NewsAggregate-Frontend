import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from '../../components/Inputs/Input';
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { confirmResetToken, changePassword } from '../../lib/features/user/thunks'; // Adjust the import path

const ChangePasswordForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { token } = router.query; // Extract token from URL
    const status = useAppSelector(selectUserStatus);
    const [error,setError] = useState("");

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    // Validate token before page loads
    useEffect(() => {
        if (token) {
            dispatch(confirmResetToken({ token: token as string }))
                .unwrap()
                .catch(() => {
                    router.push('/auth/Login');
                });
        }
    }, [token, dispatch, router]);

    // Redirect on password change success
    useEffect(() => {
        if (status === 'succeeded') {
            router.push('/'); // Redirect to home page
        }
    }, [status, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            dispatch(changePassword({ 
                token: token as string, 
                newPassword: formData.newPassword, 
                confirmPassword: formData.confirmPassword 
            }))
            .unwrap()
            .then(() => {
                router.push('/'); // Redirect to homepage on success
            })
            .catch((error) => {
                // Handle the error here (optional)
                setError('Failed to change password: ' + error);
            });
        } else {
            setError("Passwords do not match");
        }
    };

    return (
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36">
            <form onSubmit={handleSubmit} className="w-full px-4 md:w-full lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-6 rounded-[25px] border border-light-gray">
                <h1 className={`text-xl md:text-2xl font-bold text-center uppercase pb-4 ${(status === 'succeeded' || status === 'failed') ? "mb-1" : "mb-4"} border-b border-light-gray`}>
                    Change Password
                </h1>
                {error !== '' && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}

                <Input headerText="New Password" placeholder="New Password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                <Input headerText="Confirm New Password" placeholder="Confirm New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center w-full">
                    <p className="text-xs md:text-sm order-2 md:order-1">
                        <Link href="/auth/Login" className="text-primary">Cancel</Link>
                    </p>
                    <button className="w-full md:w-auto px-12 py-2 bg-primary text-black rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm">
                        Change
                    </button>
                </div>
            </form>
        </div>
    );
}

import nookies from "nookies";
import { GetServerSideProps } from "next";
import Link from 'next/link';
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
