import { read } from 'fs';
import React from 'react';

type InputProps = {
    headerText: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    type?: string;
}

const EditableInput: React.FC<InputProps> = ({ headerText, placeholder, name, value, onChange, onBlur , readOnly = false, required = true, type="text" }) => {
    return (
        <div className="flex flex-col mt-6 relative">
            <h1 className={`text-sm sm:text-md mb-1 ml-2 ${readOnly?'cursor-default':''}`}>{headerText}</h1>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                readOnly={readOnly}
                onBlur={onBlur}
                onChange={onChange}
                className={`p-2 pl-5 pr-10 bg-very-light-gray rounded-[25px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm ${readOnly?'text-gray-400 cursor-default':''}`}
            />
            {!readOnly && (
                <div className="absolute inset-y-0 right-3 top-6 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">&#9998;</span>
                </div>
            )}
        </div>
    );
}

export default EditableInput;
