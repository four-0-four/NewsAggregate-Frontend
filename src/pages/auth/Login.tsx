import React, { useState, useEffect } from 'react';
import Input from '../../components/Inputs/Input'; // Adjust the path according to your file structure
import { selectUserStatus, selectUserError } from '../../lib/features/user/slice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks'; // Adjust the import path
import PasswordInput from '../../components/Inputs/PasswordInput'; // Adjust the path according to your file structure
import { loginUser } from '../../lib/features/user/thunks';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Box from '../../components/Box/Box';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
            navigate('/');
        })
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-10  mt-[60px]">
            <div className='bg-white flex flex-row rounded-[20px] overflow-hidden'>
                <div className="hidden lg:flex px-20 justify-center items-center bg-amber-100 bg-opacity-[40%] min-h-[500px]">
                    <div className="min-w-[300px] text-center">
                        <img src="/login.png" className="max-w-[270px] m-auto"/>
                        <h1 className="text-md font-bold text-center mt-5">Your gateway to global news!</h1>
                        <p className='max-w-[250px] m-auto text-neutral-600 mt-2 leading-5 text-sm'>Widen your perspective to different viewpoints and information</p>
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 xs:p-8 sm:px-16 sm:min-h-[500px]">
                    <form onSubmit={handleSubmit} className='min-w-[270px]'>
                        <div className='flex justify-center items-center flex-grow md:flex-grow-0 mb-10'>
                            <img src={'/logo_transparent.png'} alt="Farabix" className="w-8" />
                            <p className="flex text-xl text-primary uppercase">Farabix</p>
                        </div>

                        {error && <p className="text-left text-red-500 text-sm my-2 mt-6">* {error}</p>}


                        <Input headerText="Username/Email" placeholder="Username/Email" name="username" value={formData.username} onChange={handleChange} />

                        <PasswordInput headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                        <div className='text-right text-dark-gray mt-1 text-sm underline text-primary'>
                            <a href="/auth/ForgetPassword" className='cursor-pointer'>forget password?</a>
                        </div>

                        <div className='mt-7'>
                            <PrimaryButton type="submit" text="Login" disabled={status === 'loading'} fullWidth={true}/>
                        </div>
                        <p className="text-xs md:text-sm order-2 md:order-1 text-center mt-5">
                            Are you new?
                            <a href="/auth/Register" className="text-primary"> Register</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
