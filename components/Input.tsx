import React from 'react';

type InputProps = {
    headerText: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  

const Input: React.FC<InputProps> = ({ headerText, placeholder, name, value, onChange }) => {
    return (
        <div className="flex flex-col mt-6">
            <h1 className="text-md font-semibold mb-1 ml-2">{headerText}</h1>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="p-2 px-5 bg-very-light-gray rounded-[25px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
            />
        </div>
    );
}

export default Input;