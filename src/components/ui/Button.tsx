import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const buttonVariants = ({
    variant = 'primary',
    size = 'md',
    className = ''
}: {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline',
    size?: 'sm' | 'md' | 'lg',
    className?: string
}) => {
    return cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
        {
            'bg-primary text-white hover:shadow-lg hover:shadow-primary/30 border border-transparent': variant === 'primary',
            'bg-white text-secondary border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm': variant === 'secondary',
            'bg-transparent text-secondary hover:bg-gray-100': variant === 'ghost',
            'bg-transparent border border-gray-300 text-secondary hover:border-primary hover:text-primary': variant === 'outline',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
        },
        className
    );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={buttonVariants({ variant, size, className })}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";
