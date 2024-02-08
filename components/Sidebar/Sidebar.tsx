// Sidebar.tsx or Sidebar.jsx
import React, { ReactNode } from 'react';

type SidebarProps = {
    title: string;
    children: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ title, children }) => {
    return (
        <aside className="sticky top-[80px] hidden lg:flex lg:flex-col md:w-1/4 2xl:w-1/5 bg-white rounded-[20px] border-solid border border-gray-100 py-5 xl:py-7 m-5 mx-2 min-h-[700px] h-[89vh] px-2 xl:px-3">
            <div>
                <h1 className='text-xl font-bold mb-2 px-3 xl:px-4'>
                    {title}
                </h1>
                {children}
            </div>
        </aside>
    );
};

export default Sidebar;
