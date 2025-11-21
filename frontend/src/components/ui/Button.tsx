import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'default', 
  size = 'md',
  asChild = false,
  children,
  ...props 
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'border border-input bg-background hover:bg-muted hover:text-muted-foreground': variant === 'outline',
      'hover:bg-muted hover:text-muted-foreground': variant === 'ghost',
    },
    {
      'h-9 px-3 text-sm': size === 'sm',
      'h-10 px-4 py-2': size === 'md',
      'h-11 px-8 text-lg': size === 'lg',
    },
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(baseClasses, (children.props as any).className)
    } as any);
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;