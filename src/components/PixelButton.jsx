import React from 'react';

const PixelButton = ({ children, onClick, active = false, className = "", variant = "primary" }) => {

    const baseStyles = "relative px-6 py-3 font-retro text-xs uppercase transform transition-all active:translate-y-1 active:shadow-none border-2 border-black cursor-pointer select-none";

    const variants = {
        primary: active
            ? "bg-yellow-400 text-black shadow-[inset_3px_3px_0px_rgba(255,255,255,0.5)]"
            : "bg-blue-500 text-white hover:bg-blue-400 shadow-[3px_3px_0px_#000]", // kept blue for contrast against wood/white
        secondary: active
            ? "bg-gray-700 text-white shadow-[inset_3px_3px_0px_rgba(0,0,0,0.5)]"
            : "bg-white text-black hover:bg-gray-100 shadow-[3px_3px_0px_#000]",
        danger: "bg-red-500 text-white hover:bg-red-400 shadow-[3px_3px_0px_#000]",
        action: "bg-green-500 text-white hover:bg-green-400 shadow-[3px_3px_0px_#000]"
    };

    const style = variants[variant] || variants.primary;

    return (
        <button onClick={onClick} className={`${baseStyles} ${style} ${className}`}>
            {/* Pixel shine effect */}
            {variant !== 'secondary' && (
                <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-40 pointer-events-none" />
            )}
            {children}
        </button>
    );
};

export default PixelButton;
