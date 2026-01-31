import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PixelMascot({ mood = "idle" }) {
    // Moods: 'idle', 'happy' (jumping), 'shocked' (shaking)

    const variants = {
        idle: {
            y: [0, -4, 0],
            transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        },
        happy: {
            y: [0, -30, 0, -15, 0],
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.6, ease: "easeOut" }
        },
        shocked: {
            x: [-2, 2, -2, 2, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 0.4, repeat: 2 }
        }
    };

    return (
        <motion.div
            animate={mood}
            variants={variants}
            className="relative w-16 h-16 pointer-events-none z-20"
            style={{ imageRendering: "pixelated" }}
        >
            {/* Outline / Shadow */}
            <div className="absolute inset-0 bg-black/20 translate-y-1 translate-x-1 rounded-sm blur-[1px]"></div>

            {/* BODY (Yellow) */}
            <div className="absolute bottom-0 left-2 w-12 h-10 bg-yellow-400 border-2 border-black rounded-sm"></div>

            {/* HEAD (Yellow) */}
            <div className="absolute bottom-8 left-3 w-10 h-9 bg-yellow-400 border-2 border-black rounded-sm"></div>

            {/* EARS (Black & Yellow) */}
            <div className="absolute bottom-[60px] left-1 w-3 h-5 bg-black -rotate-12 border border-black">
                <div className="absolute bottom-0 w-full h-2 bg-yellow-400"></div>
            </div>
            <div className="absolute bottom-[60px] right-2 w-3 h-5 bg-black rotate-12 border border-black">
                <div className="absolute bottom-0 w-full h-2 bg-yellow-400"></div>
            </div>

            {/* CHEEKS (Red) */}
            <div className="absolute bottom-[36px] left-4 w-2 h-2 bg-red-500 rounded-full opacity-80"></div>
            <div className="absolute bottom-[36px] right-3 w-2 h-2 bg-red-500 rounded-full opacity-80"></div>

            {/* FACE */}
            {mood === 'shocked' ? (
                <>
                    {/* Shocked Eyes (Circles) */}
                    <div className="absolute bottom-[44px] left-5 w-1 h-3 bg-black rounded-full"></div>
                    <div className="absolute bottom-[44px] right-4 w-1 h-3 bg-black rounded-full"></div>
                    {/* Shocked Mouth (Open O) */}
                    <div className="absolute bottom-[36px] left-[26px] w-2 h-3 bg-black rounded-full border border-white"></div>
                    {/* Electricity Sparks */}
                    <div className="absolute -top-4 -left-2 text-yellow-300 font-bold text-lg animate-pulse">⚡</div>
                    <div className="absolute -top-4 -right-2 text-yellow-300 font-bold text-lg animate-pulse delay-75">⚡</div>
                </>
            ) : (
                <>
                    {/* Normal/Happy Eyes */}
                    <div className="absolute bottom-[42px] left-5 w-1 h-1 bg-black rounded-full"></div>
                    <div className="absolute bottom-[42px] right-4 w-1 h-1 bg-black rounded-full"></div>

                    {/* Mouth */}
                    {mood === 'happy' ? (
                        <div className="absolute bottom-[38px] left-[26px] w-2 h-1 bg-black rounded-b-full"></div>
                    ) : (
                        <div className="absolute bottom-[38px] left-[27px] w-1 h-1 bg-black rounded-full"></div>
                    )}
                </>
            )}

            {/* TAIL (Zigzag) */}
            <div className="absolute bottom-2 -right-3 w-4 h-6">
                <div className="w-1 h-2 bg-yellow-500 absolute bottom-0 left-0 border border-black"></div>
                <div className="w-4 h-2 bg-yellow-500 absolute bottom-2 left-0 border border-black transform rotate-45"></div>
            </div>

        </motion.div>
    );
}
