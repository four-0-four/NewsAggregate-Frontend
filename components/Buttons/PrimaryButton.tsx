import React from 'react';

type ButtonProps = {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick, disabled, type = 'button' }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`m-2 mr-0 w-full md:w-auto px-12 py-2 text-black rounded-[8px] capitalize mb-4 md:mb-0 order-1 md:order-2 text-sm ${disabled ? 'bg-gray-300 text-gray-500 opactiy-100' : 'bg-primary hover:bg-opacity-80'}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
