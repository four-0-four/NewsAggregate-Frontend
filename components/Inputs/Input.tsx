import React from 'react';

type InputProps = {
    headerText: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: string;
  }
  

const Input: React.FC<InputProps> = ({ headerText, placeholder, name, value, onChange, required = true, type="text" }) => {
    return (
        <div className="flex flex-col mt-6">
            <h1 className="text-sm sm:text-md mb-1 ml-2">{headerText}</h1>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
                className="p-2 px-5 bg-very-light-gray rounded-[20px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
            />
        </div>
    );
}

export default Input;