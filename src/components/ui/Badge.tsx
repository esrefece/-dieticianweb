import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  className = '' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium';
  
  const variantStyles = {
    default: 'bg-slate-900 text-white',
    secondary: 'bg-slate-100 text-slate-900',
    outline: 'border-2 border-slate-900 text-slate-900',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
