import React from 'react';

type InputProps = {
    headerText: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    type?: string;
  }
  

const Textarea: React.FC<InputProps> = ({ headerText, placeholder, name, value, onChange, required = true, type="text" }) => {
    return (
        <div className="flex flex-col mt-6">
            <h1 className="text-sm sm:text-md mb-[3px] font-bold">{headerText}</h1>
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
                rows={5}
                className="p-2 px-3 border border-gray rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
            />
        </div>
    );
}

export default Textarea;