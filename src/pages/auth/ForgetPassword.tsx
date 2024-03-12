import React, { useState, useEffect } from 'react';
import Input from '../../components/Inputs/Input'; // Adjust the path according to your file structure
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'; // Adjust the import path
import { forgetPassword } from '../../lib/features/user/thunks';
import Box from '../../components/Box/Box';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const PasswordEmailForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);

    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(forgetPassword({ email: formData.email }));
    };

    return (
        <div className="w-full flex justify-center items-start h-screen mt-4 md:mt-16">
            <Box title="Change Password" size='small'>
                <form onSubmit={handleSubmit}>
                    {status === 'idle' && (
                        <>
                            <div className="text-left">
                                <p className="text-sm md:text-base">
                                    Enter your email for password change. If your email is available, we will send a link to it to update your password.
                                </p>
                            </div>

                            <Input headerText="Email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} type="email"/>


                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center w-full">
                                <p className="text-xs md:text-sm order-2 md:order-1">
                                    <a href="/auth/Login" className="text-primary"><span className="text-lg">&#8592;</span> Go Back</a>
                                </p>
                                <PrimaryButton text="Submit" type="submit"/>
                            </div>
                        </>
                    )}

                    {status !== 'idle' && (
                        <>
                            <div className="flex flex-col md:flex-row items-center">
                                <img src="/resetPassword.png"  className="w-1/2 md:w-1/3 h-auto mb-4 md:mb-0"/>
                                <div className="w-full md:w-2/3 text-sm md:text-base text-left md:ml-8">
                                    <h1 className='text-xl font-bold mb-2'>Check Your Email!</h1>
                                    <p>We'll send a password reset link to <span className='font-bold'>{formData.email}</span> if your email is registered with us</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center w-full">
                                <p className="text-xs md:text-sm order-2 md:order-1">
                                    <a href="/auth/ForgetPassword" className="text-primary"><span className="text-lg">&#8592;</span> Change Email</a>
                                </p>
                            </div>
                        </>
                    )}

                </form>
            </Box>
        </div>
    );
}

export default PasswordEmailForm;
