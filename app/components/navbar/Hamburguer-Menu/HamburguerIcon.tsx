import React from 'react';

interface HamburguerIconProps {
  className?: string;
}

const HamburgerIcon: React.FC<HamburguerIconProps> = ({ className }) => {
  return (
    <div className={` ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="50"
        viewBox="0 0 64 64"
      >
        <path
          fill="#9c34c2"
          d="M54,16.5c0,1.24-0.5,2.37-1.32,3.18C51.87,20.5,50.74,21,49.5,21h-35c-2.49,0-4.5-2.01-4.5-4.5	c0-1.18,0.45-2.26,1.21-3.06c0.03-0.04,0.07-0.08,0.11-0.12C12.13,12.5,13.26,12,14.5,12h35C51.99,12,54,14.01,54,16.5z"
        ></path>

        <path
          fill="#9c34c2"
          d="M49.5,51h-35c-2.485,0-4.5-2.015-4.5-4.5v0c0-2.485,2.015-4.5,4.5-4.5h35c2.485,0,4.5,2.015,4.5,4.5	v0C54,48.985,51.985,51,49.5,51z"
        ></path>
        <path
          fill="#9c34c2"
          d="M49.5,36h-35c-2.485,0-4.5-2.015-4.5-4.5v0c0-2.485,2.015-4.5,4.5-4.5h35c2.485,0,4.5,2.015,4.5,4.5	v0C54,33.985,51.985,36,49.5,36z"
        ></path>
      </svg>
    </div>
  );
};
export default HamburgerIcon;
