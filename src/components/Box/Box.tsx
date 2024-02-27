// Box.tsx or Box.jsx
import React, { ReactNode } from 'react';

type BoxProps = {
    title: string;
    icon?: ReactNode; // Optional icon
    children: ReactNode;
    size?: 'normal' | 'small'; // Adding a size prop
};

const Box: React.FC<BoxProps> = ({ title, icon, children, size = 'normal' }) => {
    // Determine the size class based on the size prop
    const sizeClass = size === 'small' ? 'max-w-[400px] md:max-w-lg' : 'max-w-[400px] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl';

    return (
        <div className={`w-full px-4 sm:w-full ${sizeClass} bg-white rounded-[20px] border border-gray-100  p-5 xl:p-7`}>
            <h1 className={`text-xl font-bold text-left capitalize pb-4 font-semibold flex items-center`}>
                {icon && <span className="mr-2">{icon}</span>} {/* Render the icon if provided */}
                {title}
            </h1>
            {children}
        </div>
    );
};

export default Box;
