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
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-10  mt-[60px]">
            <div className='bg-white flex flex-row rounded-[20px] overflow-hidden'>
                <div className="hidden lg:flex px-20 justify-center items-center bg-amber-100 bg-opacity-[40%] min-h-[450px] xl:min-h-[500px]">
                    <div className="min-w-[300px] text-center">
                        <img src="/forgotPassword.png" className="max-w-[270px] m-auto"/>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 xs:p-8 sm:px-16 sm:min-h-[450px] xl:min-h-[500px]">
                    <form onSubmit={handleSubmit} className='max-w-[270px]'>
                        <div className='flex justify-center items-center flex-grow md:flex-grow-0 mb-10'>
                            <img src={'/logo_transparent.png'} alt="Farabix" className="w-8" />
                            <p className="flex text-xl text-primary uppercase">Farabix</p>
                        </div>
                        {status === 'idle' && (
                            <>
                                <div className="text-left">
                                    <h1 className='font-bold mb-1'>Change Password</h1>
                                    <p className="text-sm">
                                        Enter your email for password change. If your email is available, we will send a link to it to update your password.
                                    </p>
                                </div>

                                <Input headerText="Email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} type="email"/>
                                
                                <div className='mt-7'>
                                    <PrimaryButton text="Submit" type="submit" fullWidth={true}/>
                                </div>

                                <div className="mt-2 flex flex-col sm:flex-row justify-center items-center w-full">
                                    <p className="text-xs md:text-sm order-2 md:order-1">
                                        <a href="/auth/Login" className="text-primary"><span className="text-lg">&#8592;</span> Go Back</a>
                                    </p>
                                </div>
                            </>
                        )}

                        {status !== 'idle' && (
                            <>
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="w-full text-sm md:text-base text-left">
                                        <h1 className='text-lg font-bold mb-2'>Check Your Email!</h1>
                                        <p className='text-sm'>We'll send a password reset link to <span className='font-bold text-md'>{formData.email}</span> if your email is registered with us</p>
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center w-full">
                                    <p className="text-xs md:text-sm order-2 md:order-1">
                                        <a href="/auth/ForgetPassword" className="text-primary"><span className="text-lg">&#8592;</span> Change Email</a>
                                    </p>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordEmailForm;
