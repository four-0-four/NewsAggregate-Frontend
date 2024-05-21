// SidebarElement.tsx or SidebarElement.jsx
import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type SidebarElementProps = {
    href: string;
    icon: ReactNode;
    children: ReactNode;
};

const SidebarElement: React.FC<SidebarElementProps> = ({ href, icon, children }) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <a href={href} className={`flex items-center justify-center py-2 text-md cursor-pointer border-2 border-white rounded-[20px] ${isActive(href) ? 'bg-primary' : ''} px-3 xl:px-4`}>
            <span className="mr-0">{icon}</span>
            <span className="flex-grow leading-5">{children}</span>
        </a>
    );
};

export default SidebarElement;
