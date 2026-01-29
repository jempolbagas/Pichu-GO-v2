import { motion } from "framer-motion";

export const GameButton = ({ children, onClick, className = "" }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, y: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onClick}
            className={`
        relative px-8 py-4 
        font-pixel text-xl text-white uppercase tracking-widest
        bg-[#0095e9] 
        border-4 border-white
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
        active:shadow-none
        hover:bg-[#2bb4ff]
        cursor-pointer
        select-none
        ${className}
      `}
            style={{
                imageRendering: "pixelated",
                textShadow: "2px 2px 0px #005f9e",
            }}
        >
            {/* Pixel corners */}
            <div className="absolute -top-1 -left-1 w-1 h-1 bg-transparent shadow-[1px_1px_0_0_rgba(0,0,0,0.2)]" />

            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Side highlights for 3D effect */}
            <div className="absolute inset-x-0 bottom-0 h-2 bg-[#007bb8] opacity-50" />
        </motion.button>
    );
};
