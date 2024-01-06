import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Input from '../components/Input'; // Adjust the path according to your file structure
import { registerUser, selectUserStatus, selectUserError } from '../lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);

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
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36">
            <form onSubmit={handleSubmit} className="w-full px-4 md:w-full lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-6 rounded-[25px] border border-light-gray">
                <h1 className={`text-xl md:text-2xl font-bold text-center uppercase pb-4 ${(status === 'succeeded' || status === 'failed')?"mb-1":"mb-4"} border-b border-light-gray`}>Register</h1>
                {status === 'succeeded' && <p className="text-left text-green-500 text-sm mb-2">* Registration successful!</p>}
                {status === 'failed' && <p className="text-left text-red-500 text-sm mb-2">* {error}</p>}


                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                    <Input headerText="First Name" placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
                    <Input headerText="Last Name" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
                </div>

                <Input headerText="Email" placeholder="email@example.com" name="email" value={formData.email} onChange={handleChange} />

                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                    <Input headerText="Password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    <Input headerText="Confirm Password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>

                <div className="mt-10 flex flex-col md:flex-row justify-between items-center w-full">
                    <p className="text-xs md:text-sm order-2 md:order-1">
                        Already have an account? 
                        <a href="/Login" className="text-primary"> Log In</a>
                    </p>
                    <button className="w-full md:w-auto px-12 py-2 bg-primary text-black rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2 text-sm">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
