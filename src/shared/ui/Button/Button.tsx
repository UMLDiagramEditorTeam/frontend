import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
}) => {
  const variantClass = variant === 'outline' ? 'btnOutline' : 'btnPrimary';

  const combinedClasses = `btn ${variantClass} ${className}`;

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};
