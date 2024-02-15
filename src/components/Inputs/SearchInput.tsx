import React from 'react';

type InputProps = {
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<InputProps> = ({ placeholder, name, value, onChange}) => {
    // Function to clear the input
    const handleClearInput = () => {
        onChange({ target: { name, value: '' }} as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="max-w-[500px]">
            <div className="flex flex-col relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* Search Icon */}
                    <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </span>
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="p-2 px-10 border border-gray rounded-[8px] focus:outline-none placeholder:text-xs sm:placeholder:text-sm"
                />
                {value && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleClearInput}>
                        {/* X Icon */}
                        <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                )}
            </div>
        </div>
    );
}

export default SearchInput;
