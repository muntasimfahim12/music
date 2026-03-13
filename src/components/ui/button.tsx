"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface HeroButtonProps {
    title: string;
    variant: 'primary' | 'outline' | 'cart' | 'premium';
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
}

const Button = ({ title, variant, onClick, className, icon }: HeroButtonProps) => {
    const [hovered, setHovered] = useState(false);
    const [direction, setDirection] = useState("TOP");

    const rotateDirection = useCallback((currentDirection: string) => {
        const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const index = directions.indexOf(currentDirection);
        const nextIndex = (index - 1 + directions.length) % directions.length;
        return directions[nextIndex];
    }, []);

    useEffect(() => {
        if (!hovered && variant === 'premium') {
            const interval = setInterval(() => {
                setDirection((prevState) => rotateDirection(prevState));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [hovered, variant, rotateDirection]);

    const movingMap: Record<string, string> = {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, #FF2E2E 0%, rgba(255, 46, 46, 0) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #FF2E2E 0%, rgba(255, 46, 46, 0) 100%)",
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #FF2E2E 0%, rgba(255, 46, 46, 0) 100%)",
        RIGHT: "radial-gradient(16.2% 41.1% at 100% 50%, #FF2E2E 0%, rgba(255, 46, 46, 0) 100%)",
    };

    const highlight = "radial-gradient(75% 181% at 50% 50%, #FF2E2E 0%, rgba(0, 0, 0, 0) 100%)";

    const baseStyles = "group relative flex-1 max-w-[240px] py-4 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-sm flex items-center justify-center gap-2 overflow-hidden";

    const variantConfig = {
        primary: {
            style: "bg-[#FF2E2E] text-white border-none shadow-[0_0_20px_rgba(255,46,46,0.2)]",
            hover: { scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }
        },
        outline: {
            style: "border border-zinc-700 text-zinc-400 px-8 py-4",
            hover: { scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }
        },
        cart: {
            style: "border border-zinc-700 text-zinc-400",
            hover: { scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }
        },
        premium: {
            style: "bg-black/80 text-white backdrop-blur-xl",
            hover: { scale: 1.05 }
        }
    };

    const current = variantConfig[variant] || variantConfig.primary;

    return (
        <motion.button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={current.hover}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${current.style} ${className} ${variant === 'premium' ? 'p-px' : ''}`}
        >
            {variant === 'premium' && (
                <>
                    <motion.div
                        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
                        style={{ filter: "blur(2px)" }}
                        initial={{ background: movingMap[direction] }}
                        animate={{ background: hovered ? [movingMap[direction], highlight] : movingMap[direction] }}
                        transition={{ ease: "linear", duration: 0.8 }}
                    />
                    <div className="absolute inset-[1.5px] bg-black z-10 rounded-[inherit]" />
                </>
            )}

            <span className="relative z-20 flex items-center gap-2">
                {icon && icon}
                {title}
            </span>
        </motion.button>
    );
};

export default Button;