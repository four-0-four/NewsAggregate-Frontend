import React from 'react';

type ButtonProps = {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick, disabled, type = 'button', fullWidth = false }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`w-full ${fullWidth?'':'sm:w-auto'} sm:mr-0 mr-0 px-12 border border-primary py-2 text-black rounded-[8px] capitalize mb-1 sm:mb-4 md:mb-0 order-1 sm:order-2 text-sm ${disabled ? 'bg-gray-300 text-gray-500 opactiy-100' : 'bg-primary hover:bg-opacity-80'}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
