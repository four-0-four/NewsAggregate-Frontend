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
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-10 mt-[60px]">
            <div className='bg-white flex flex-row rounded-[20px] overflow-hidden'>
                <div className="hidden lg:flex px-20 justify-center items-center bg-amber-100 bg-opacity-[40%] min-h-[500px]">
                    <div className="min-w-[300px] text-center">
                        <img src="/register.png" className="max-w-[270px] m-auto"/>
                        <h1 className="text-md font-bold text-center mt-5">Your gateway to global news!</h1>
                        <p className='max-w-[250px] m-auto text-neutral-600 mt-2 leading-5 text-sm'>Widen your perspective to different viewpoints and information</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit}>
                        {registered && (
                            <div className="flex flex-col items-center justify-start sm:justify-center p-4 py-8 xs:p-8 sm:px-16 lg:min-h-[600px] max-w-[400px] sm:max-w-[450px]">
                                <div className='flex justify-center items-center flex-grow md:flex-grow-0 mb-4 sm:mb-8'>
                                    <img src={'/logo_transparent.png'} alt="Farabix" className="w-8" />
                                    <p className="flex text-xl text-primary uppercase">Farabix</p>
                                </div>
                                <p className="w-full text-sm md:text-base sm:text-left text-left md:ml-8">
                                    <h1 className='text-lg font-bold mb-2'>Check Your Email Please!</h1>
                                    Registration successful! Before completing your registration, you need to confirm your account. Please check your email to verify your account.
                                </p>
                            </div>
                        )}
                        {status === 'failed' && <p className="text-left text-red-500 text-sm mb-2">* {(error && error.includes("[object Object]"))?"Something went wrong":error}</p>}


                        {!registered && (
                            <div className='relative flex flex-col justify-center  p-4 xs:p-8 lg:px-12 sm:min-h-[600px] w-[95vw] max-w-[350px] xs:max-w-[450px]'>
                                {loading && status !== 'failed' && (
                                    <div className="z-10 w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-70">
                                        <img src="/loading.gif" className='w-[50px]'/>
                                        <p className='text-primary text-lg mt-1'>Loading...</p>
                                    </div>
                                )}

                                <div className='flex justify-center items-center flex-grow-0 mb-1'>
                                    <img src={'/logo_transparent.png'} alt="Farabix" className="w-8" />
                                    <p className="flex text-xl text-primary uppercase">Farabix</p>
                                </div>
                                <div className="grid xs:grid-cols-2 grid-cols-1 xs:gap-x-2 mb-[-7px]">
                                    <Input headerText="First Name" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} min={2}/>
                                    <Input headerText="Last Name" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
                                </div>

                                <Input headerText="Email" placeholder="email@example.com" name="email" type="email" value={formData.email} onChange={handleChange} />
                                
                                <PasswordInput headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                                <PasswordInput headerText="Confirm Password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                
                                <div className='mt-9'>
                                    <PrimaryButton type="submit" text="Register" disabled={status === 'loading'} fullWidth={true}/>
                                </div>
                                <p className="text-xs md:text-sm order-2 md:order-1 text-center  mt-5">
                                    Already have an account? 
                                    <a href="/auth/Login" className="text-primary"> Log In</a>
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
