import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, hoverEffect = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass-card rounded-xl p-6 relative overflow-hidden",
                    hoverEffect && "hover:-translate-y-1 hover:shadow-2xl hover:border-white/40",
                    className
                )}
                {...props}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";
