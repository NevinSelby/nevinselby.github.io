import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
    delay?: number;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, delay = 0 }) => {
    return (
        <section id={id} className={`py-16 md:py-24 relative ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </section>
    );
};
