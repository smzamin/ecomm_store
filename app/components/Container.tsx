import React from 'react';

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={'w-full mx-auto px-4 ' + className}>
      {children}
    </div>
  );
};

export default Container;
