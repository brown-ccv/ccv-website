import React, { useState } from 'react';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

const navItems = [
  { name: "Services", hasDropdown: true },
  { name: "Portfolio", hasDropdown: true },
  { name: "Blog", hasDropdown: false },
  { name: "About", hasDropdown: true },
];

export const NavbarAnima: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <nav className="w-full h-[131px] bg-extendeddark-blue">
      <div className="flex items-center justify-between px-[51px] h-full">
        <div className="flex items-center space-x-4">
          {/* Grid pattern icon */}
          <div className="w-[126px] h-12 relative">
            {Array.from({ length: 15 }).map((_, i) => (
              <img
                key={i}
                className="absolute w-3.5 h-3.5"
                alt="Grid dot"
                src={`https://c.animaapp.com/VOhWj8ET/img/group${i > 0 ? `-${i}` : ""}@2x.png`}
                style={{
                  top: `${Math.floor(i / 5) * 16.5}px`,
                  left: `${(i % 5) * 16.5 + 0.5}px`,
                }}
              />
            ))}
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-[13px] text-defaultwhite"
              >
                <span className="font-semibold text-xl">{item.name}</span>
                {item.hasDropdown && (
                  <ChevronDownIcon className="w-2.5 h-2.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-8">
          {/* Help and Docs links */}
          <div className="flex items-center text-defaultwhite">
            <div className="mr-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 22H-22V-22H22V22ZM11 15C10.337 15 9.7011 14.7366 9.2322 14.2678C8.76339 13.7989 8.5 13.163 8.5 12.5C8.5 11.837 8.76339 11.2011 9.2322 10.7322C9.7011 10.2634 10.337 10 11 10C11.663 10 12.2989 10.2634 12.7678 10.7322C13.2366 11.2011 13.5 11.837 13.5 12.5C13.5 13.163 13.2366 13.7989 12.7678 14.2678C12.2989 14.7366 11.663 15 11 15ZM11 9C10.337 9 9.7011 8.73661 9.2322 8.26777C8.76339 7.79893 8.5 7.16304 8.5 6.5C8.5 5.83696 8.76339 5.20107 9.2322 4.73223C9.7011 4.26339 10.337 4 11 4C11.663 4 12.2989 4.26339 12.7678 4.73223C13.2366 5.20107 13.5 5.83696 13.5 6.5C13.5 7.16304 13.2366 7.79893 12.7678 8.26777C12.2989 8.73661 11.663 9 11 9Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="font-semibold text-xl">Help</span>
          </div>

          <div className="flex items-center text-defaultwhite">
            <div className="mr-2">
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 22H-18V-22H18V22ZM4.5 16.5H13.5V15H4.5V16.5ZM4.5 12H13.5V10.5H4.5V12ZM4.5 7.5H13.5V6H4.5V7.5ZM2.25 19.5C1.85218 19.5 1.47064 19.342 1.18934 19.0607C0.908035 18.7794 0.75 18.3978 0.75 18V3C0.75 2.60218 0.908035 2.22064 1.18934 1.93934C1.47064 1.65804 1.85218 1.5 2.25 1.5H12L17.25 6.75V18C17.25 18.3978 17.092 18.7794 16.8107 19.0607C16.5294 19.342 16.1478 19.5 15.75 19.5H2.25ZM11.25 7.5V3H2.25V18H15.75V7.5H11.25Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="font-semibold text-xl">Docs</span>
          </div>

          {/* SearchIcon button and input */}
          <div className="relative">
            {isSearchExpanded ? (
              <div className="flex items-center">
                {/* <Input
                  type="text"
                  placeholder="Search..."
                  className="w-[200px] h-[45px] rounded-full bg-white text-black"
                /> */}
                <Button
                  size="icon"
                  className="w-[45px] h-[45px] rounded-full bg-extendedsunglow-400 ml-2"
                  onClick={handleSearchToggle}
                >
                  <SearchIcon className="h-6 w-6" />
                </Button>
              </div>
            ) : (
              <Button
                size="icon"
                className="w-[45px] h-[45px] rounded-full bg-extendedsunglow-400"
                onClick={handleSearchToggle}
              >
                <SearchIcon className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
