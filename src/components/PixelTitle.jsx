import { motion } from "framer-motion";

export const PixelTitle = () => {
    return (
        <div className="flex flex-col items-center gap-2 mb-8 select-none z-10">
            <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-6xl md:text-8xl font-black text-center text-title-gold leading-tight tracking-tight relative"
                style={{
                    textShadow: `
            4px 4px 0px #b8860b,
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            8px 8px 0px rgba(0,0,0,0.2)
          `
                }}
            >
                <div>GO</div>
                <div>PICHU</div>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-white opacity-90 tracking-widest mt-4 bg-black/20 px-4 py-1 rounded"
            >
                ©PICHUZENS ON TIKTOK. ALL RIGHTS RESERVED.
            </motion.p>
        </div>
    );
};
