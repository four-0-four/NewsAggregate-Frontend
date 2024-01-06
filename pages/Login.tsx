import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/Input'; // Adjust the path according to your file structure
import { selectUserStatus, selectUserError, loginUser } from '../lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks'; // Adjust the import path

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (status === 'succeeded') {
            router.push('/'); // Redirect to home page on successful login
        }
    }, [status, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ username: formData.username, password: formData.password }));
    };

    return (
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36">
            <form onSubmit={handleSubmit} className="w-full px-4 md:w-full lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-6 rounded-[25px] border border-light-gray">
                <h1 className={`text-xl md:text-2xl font-bold text-center uppercase pb-4 ${(status === 'succeeded' || status === 'failed')?"mb-1":"mb-4"} border-b border-light-gray`}>Login</h1>
                {status === 'succeeded' && <p className="text-left text-green-500 text-sm mb-2">* Login successful!</p>}
                {status === 'failed' && <p className="text-left text-red-500 text-sm mb-2">* Incorrect username/email or password</p>}


                <Input headerText="Username/Email" placeholder="Username/Email" name="username" value={formData.username} onChange={handleChange} />

                <Input headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                <div className='text-right text-dark-gray mt-1'>
                    <a className='cursor-pointer'>forget password?</a>
                </div>

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center w-full">
                    <p className="text-xs md:text-sm order-2 md:order-1">
                        Doesn't Have an Account?
                        <a href="/Register" className="text-primary"> Register</a>
                    </p>
                    <button className="w-full md:w-auto px-12 py-2 bg-primary text-black rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
