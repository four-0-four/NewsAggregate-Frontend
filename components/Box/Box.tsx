// Box.tsx or Box.jsx
import React, { ReactNode } from 'react';

type BoxProps = {
    title: string;
    icon?: ReactNode; // Optional icon that can be a React component (e.g., an SVG or an icon from a library like FontAwesome)
    children: ReactNode;
};

const Box: React.FC<BoxProps> = ({ title, icon, children }) => {
    return (
        <div className="w-full px-4 sm:w-full md:max-w-2xl lg:max-w-2xl xl:max-w-3xl bg-white rounded-[20px] border border-gray-100  p-5 xl:p-7">
            <h1 className={`text-xl font-bold text-left capitalize pb-4 font-semibold flex items-center`}>
                {icon && <span className="mr-2">{icon}</span>} {/* Render the icon if provided */}
                {title}
            </h1>
            {children}
        </div>
    );
};

export default Box;
