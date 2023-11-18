import * as React from 'react';

export interface IHeaderProps {
}

export function Header (props: IHeaderProps) {
    const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex-col w-full">
        {/* Logo Section */}
        <div className="w-full pb-2 flex justify-center items-center">
            <img src="https://farabix-resources.nyc3.cdn.digitaloceanspaces.com/website/logo.png"
                className="h-12 pb-2 pr-2" />
            <span className="text-4xl font-bold uppercase">Farabix</span>
        </div>
        {/* Navigation Menu Section */}
        <div className="border-t border-b py-1 border-black w-full flex flex-col md:flex-row justify-between">
            <span>
                <a href="/landing" className="px-4 py-1 my-1 border-r border-black bg-black text-white">Landing</a>
                <span className="px-4 py-1 my-1">Will Launch Soon!</span>
            </span>
            <span className="text-gray-700 px-4 self-center md:self-auto">
                {formattedDate}
            </span>
        </div>
    </div>
  );
}



