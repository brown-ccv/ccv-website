import React, { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  text: string;
  speed?: number;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <div className="flex items-center">
      <div className="mr-4">
        <img
          className="w-[59px] h-[62px]"
          alt="CCV logo"
          src="https://c.animaapp.com/VOhWj8ET/img/mask-group.png"
        />
      </div>
      <h2 className="font-semibold text-white text-[40px] tracking-[-1.20px]">
        {displayedText}
      </h2>
    </div>
  );
};
