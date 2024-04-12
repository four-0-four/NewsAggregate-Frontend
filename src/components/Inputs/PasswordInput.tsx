import { ClosedEyeIcon, OpenEyeIcon } from '../../util/illustrations';
import React, { useState } from 'react';

type PasswordInputProps = {
    headerText: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ headerText, placeholder, name, value, onChange, required = true }) => {
    const [viewPassword, setViewPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setViewPassword(!viewPassword);
    };

    return (
        <div className="flex flex-col mt-3 relative z-5">
            <h1 className="text-sm sm:text-md mb-[3px] font-bold">{headerText}</h1>
            <input
                type={viewPassword ? 'text' : 'password'}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
                minLength={8}
                className="p-2 px-3 border border-gray rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary  placeholder:text-xs sm:placeholder:text-sm"
            />
            <div className="absolute inset-y-0 right-3 top-6 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                {viewPassword ? (
                    <span className="text-gray-500 text-lg">{OpenEyeIcon()}</span>
                ) : (
                    <span className="text-gray-500 text-lg">{ClosedEyeIcon()}</span>
                )}
            </div>
        </div>
    );
}

export default PasswordInput;
