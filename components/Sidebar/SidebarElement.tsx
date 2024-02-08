// SidebarElement.tsx or SidebarElement.jsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarElementProps = {
    href: string;
    icon: ReactNode;
    children: ReactNode;
};

const SidebarElement: React.FC<SidebarElementProps> = ({ href, icon, children }) => {
    const router = useRouter();

    const isActive = (path: string) => {
        return router.pathname === path;
    };

    return (
        <Link href={href} className={`block py-2 text-md cursor-pointer border-2 border-white rounded-[20px] ${isActive(href) ? 'bg-primary' : ''} px-3 xl:px-4`}>
            {icon}
            {children}
        </Link>
    );
};

export default SidebarElement;
