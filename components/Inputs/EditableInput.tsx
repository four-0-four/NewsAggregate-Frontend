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
            <h1 className={`text-sm sm:text-md mb-[3px] font-bold ${readOnly?'cursor-default':''}`}>{headerText}</h1>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                readOnly={readOnly}
                onBlur={onBlur}
                onChange={onChange}
                className={`p-2 px-3 border border-gray rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm ${readOnly?'text-gray-400 cursor-default':''}`}
            />
            {!readOnly && (
                <div className="absolute inset-y-0 right-3 top-6 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-gray-500 w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default EditableInput;
