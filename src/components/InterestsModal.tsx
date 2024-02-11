import React from 'react';
import Interests from './Interests';

interface InterestsModalProps {
    onClose: () => void; // Type definition for the onClose function
    interests: string[];
}

const InterestsModal: React.FC<InterestsModalProps> = ({ onClose, interests }) => {
    const modalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent click from reaching the overlay
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-4 rounded-lg max-w-[350px] relative" onClick={modalContentClick}>
                <Interests interests={interests} />
                <button onClick={onClose} className="absolute top-3 right-4 text-xl">X</button>
            </div>
        </div>
    );
};

export default InterestsModal;
