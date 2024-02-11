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
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36 px-2 sm:px-10">
            <Box title="Login" size="small">
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                    <Input headerText="Username/Email" placeholder="Username/Email" name="username" value={formData.username} onChange={handleChange} />

                    <PasswordInput headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    <div className='text-right text-dark-gray mt-1'>
                        <a href="/auth/ForgetPassword" className='cursor-pointer'>forget password?</a>
                    </div>

                    <div className="mt-5 flex flex-col md:flex-row justify-between items-center w-full">
                        <p className="text-xs md:text-sm order-2 md:order-1">
                            Doesn&apos;t Have an Account?
                            <a href="/auth/Register" className="text-primary"> Register</a>
                        </p>
                        <PrimaryButton type="submit" text="Login" disabled={status === 'loading'} />
                    </div>
                </form>
            </Box>
        </div>
    );
}

export default LoginForm;
