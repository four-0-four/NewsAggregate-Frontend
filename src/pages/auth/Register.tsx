import React, { useState } from 'react';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Box from '../../components/Box/Box';
import Input from '../../components/Inputs/Input'; // Adjust the path according to your file structure
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'; // Adjust the import path
import PasswordInput from '../../components/Inputs/PasswordInput'; // Adjust the path according to your file structure
import { registerUser } from '../../lib/features/user/thunks';

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        dispatch(registerUser(formData)).unwrap().then(() => {
            setLoading(false);
            setRegistered(true);
        });
    };

    return (
        <div className="flex w-full justify-center items-start h-screen mt-4 md:mt-16 px-2 sm:px-10">
            <Box title="Register">
                <form onSubmit={handleSubmit}>
                    {registered && (
                        <div className="flex flex-col md:flex-row items-center">
                            <img src={"/emailSent.png"} className='w-1/2 md:w-1/3 h-auto mb-4 md:mb-0'/>
                            <p className="w-full xs:w-2/3 text-sm md:text-base text-left md:ml-8">
                                <h1 className='text-xl font-bold mb-2'>Check Your Email Please!</h1>
                                Registration successful! Before completing your registration, you need to confirm your account. Please check your email to verify your account.
                            </p>
                        </div>
                    )}
                    {status === 'failed' && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                    {!registered && (
                        <div className='relative'>
                            {loading && (
                                <div className="z-10 w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-70">
                                    <img src="/loading.gif" className='w-[50px]'/>
                                    <p className='text-primary text-lg mt-1'>Loading...</p>
                                </div>
                            )}
                            <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                                <Input headerText="First Name" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
                                <Input headerText="Last Name" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
                            </div>

                            <Input headerText="Email" placeholder="email@example.com" name="email" type="email" value={formData.email} onChange={handleChange} />

                            <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                                <PasswordInput headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                                <PasswordInput headerText="Confirm Password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center w-full">
                                <p className="text-xs md:text-sm order-2 md:order-1">
                                    Already have an account? 
                                    <a href="/auth/Login" className="text-primary"> Log In</a>
                                </p>
                                <PrimaryButton type="submit" text="Register" disabled={status === 'loading'} />
                            </div>
                        </div>
                    )}
                </form>
            </Box>
        </div>
    );
}

export default RegisterForm;
