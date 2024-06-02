import { FC, ReactNode } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface ButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

const FancyButton: FC<ButtonProps> = ({ text, icon, onClick, children }) => {
  return (
    <div className="flex justify-center md:block">
      <button
        className="fancy-btn text-1xl flex cursor-pointer items-center gap-2 rounded-full border-2 border-orange-500 bg-white px-2 py-3 font-bold text-black transition-all duration-75 hover:bg-orange-500 hover:text-white md:px-8 md:py-4"
        onClick={onClick}
      >
        {children}
        <span>{text}</span>
        <span className="text-black transition-transform duration-100 group-hover:translate-x-[.23vw] group-hover:text-white">
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
};

export default FancyButton;
