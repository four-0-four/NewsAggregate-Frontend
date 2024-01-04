import React from 'react';
import Input from '../components/Input'; // Adjust the path according to your file structure

const RegisterForm = () => {
    return (
        <div className="flex justify-center items-start h-screen mt-4 md:mt-16 lg:mt-36">
            <div className="w-full px-4 md:w-full lg:max-w-xl xl:max-w-2xl mx-auto bg-white p-6 rounded-[25px] border border-light-gray">
                <h1 className="text-xl md:text-2xl font-bold text-left pb-4 mb-4 border-b border-light-gray">Register</h1>

                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                    <Input headerText="First Name" placeholder="John" />
                    <Input headerText="Last Name" placeholder="Doe" />
                </div>

                <Input headerText="Email" placeholder="john@example.com" />

                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-4">
                    <Input headerText="Password" placeholder="Password" />
                    <Input headerText="Confirm Password" placeholder="Confirm Password" />
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center w-full">
                    <p className="text-xs md:text-sm order-2 md:order-1">
                        Already have an account? 
                        <a href="/login" className="text-primary"> Log In</a>
                    </p>
                    <button className="w-full md:w-auto px-12 py-2 bg-primary text-black rounded-[25px] uppercase mb-4 md:mb-0 order-1 md:order-2">
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
