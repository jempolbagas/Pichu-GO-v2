import { motion } from "framer-motion";

export const PixelCharacter = () => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
            }}
            className="relative w-16 h-16"
            style={{ imageRendering: "pixelated" }}
        >
            {/* Body */}
            <div className="absolute bottom-0 left-2 w-12 h-10 bg-[#8b4513] rounded-sm" />

            {/* Head */}
            <div className="absolute bottom-8 left-4 w-8 h-8 bg-[#8b4513] rounded-sm" />

            {/* Beak */}
            <div className="absolute bottom-10 right-2 w-2 h-2 bg-title-gold" />

            {/* Eye */}
            <div className="absolute bottom-12 right-6 w-2 h-2 bg-black" />

            {/* Comb (Red part on head) */}
            <div className="absolute bottom-16 left-6 w-4 h-2 bg-red-600" />

            {/* Tail */}
            <div className="absolute bottom-4 left-0 w-4 h-4 bg-[#6d300b]" />

            {/* Legs */}
            <div className="absolute -bottom-2 left-4 w-2 h-2 bg-title-gold" />
            <div className="absolute -bottom-2 right-8 w-2 h-2 bg-title-gold" />
        </motion.div>
    );
};
