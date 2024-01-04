import React from 'react';

type Props = {
    headerText: string;
    placeholder: string;
}

const Input: React.FC<Props> = ({ headerText, placeholder }) => {
    return (
        <div className="flex flex-col mb-4">
            <h1 className="text-md font-semibold mb-1 ml-2">{headerText}</h1>
            <input
                type="text"
                placeholder={placeholder}
                className="p-2 px-5 bg-very-light-gray rounded-[25px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    );
}

export default Input;