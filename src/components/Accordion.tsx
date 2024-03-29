// Accordion.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface AccordionProps {
    question: string;
    answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative w-full border border-gray-200 rounded-[10px] bg-white">
            <h6 className="mb-0">
                <button
                    onClick={toggleAccordion}
                    className="flex justify-between items-center w-full p-2 px-3 sm:p-3 sm:px-4 text-left transition-all ease-in cursor-pointer group text-sm font-bold text-gray-800"
                >
                    <span>{question}</span>
                    <FontAwesomeIcon 
                        icon={isOpen ? faMinus : faPlus} 
                        className={`p-1 rounded-[10px] text-md md:text-md ${isOpen ? '' : 'text-black'}`}
                    />
                </button>
            </h6>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'h-auto' : 'h-0'}`}
            >
                <div className="p-4 pt-0 text-sm md:text-md leading-normal text-gray-500 text-left">
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default Accordion;

