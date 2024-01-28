import React, { useState, useEffect } from 'react';

type Props = {
  message: string;
}

const Toast = ({ message }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(100); // percentage of time left

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) return prevTime - 1.43; // decrease 2% every 100ms
        return 0;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div id="toast-bottom-left" className="fixed flex items-center w-full max-w-xs text-gray-500 bg-white divide-gray-200 rounded-lg shadow bottom-5 right-5 shadow-lg" role="alert">
      <div className='flex flex-row w-full p-4'>
        <div className="text-sm font-normal flex-grow">{message}</div>
        <div className="ml-4 cursor-pointer" onClick={() => setIsVisible(false)}>X</div>
      </div>
      <div className="w-full bg-gray-200 h-1 absolute bottom-0 left-0">
        <div className="bg-primary h-1" style={{ width: `${timeLeft}%` }}></div>
      </div>
    </div>
  );
}

export default Toast;