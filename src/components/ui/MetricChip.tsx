import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricChipProps {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
    className?: string;
}

export const MetricChip: React.FC<MetricChipProps> = ({ label, value, trend, className = '' }) => {
    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 ${className}`}>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{label}</span>
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                    {trend === 'up' && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
                    {trend === 'down' && <ArrowDownRight className="w-3 h-3 text-emerald-400" />}
                    {/* Note: In this context, 'down' often means 'reduction' (latency, cost) which is good, so using emerald for both usually makes sense, or valid semantic colors. 
              For "latency -35%", trend='down' -> Green. 
              For "uptime", trend='up' -> Green. */}
                </div>
            </div>
        </div>
    );
};
