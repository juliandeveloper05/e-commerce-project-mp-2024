import React from 'react';

interface FooterListProps {
  children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="mb-6 flex w-full flex-col gap-2 sm:w-1/2 md:w-1/4 lg:w-1/6">
      {children}
    </div>
  );
};

export default FooterList;
