import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'accent';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: "bg-gray-100 text-gray-700 border border-gray-200",
        outline: "border border-gray-300 text-gray-500",
        accent: "bg-blue-50 text-primary border border-blue-100",
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
