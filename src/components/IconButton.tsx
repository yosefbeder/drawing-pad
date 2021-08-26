import React from 'react';

interface IconButtonProps {
  isSelected?: boolean;
}

const IconButton: React.FC<
  IconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = props => {
  const { className, children, isSelected, ...restProps } = props;

  return (
    <button
      className={`icon-button ${className} ${
        isSelected && 'icon-button--selected'
      }`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default IconButton;
