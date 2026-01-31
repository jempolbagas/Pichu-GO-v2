import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ResultCard({ result }) {
    // Local state for number animation (basic counting effect)
    const [displayTotal, setDisplayTotal] = useState(0);

    useEffect(() => {
        // Simple easing for the total number
        let start = displayTotal;
        const end = result.total;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (end - start) * ease);
            setDisplayTotal(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [result.total]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-8 bg-solar-bg p-4 border-4 border-inset border-gray-700 rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] ml-0 bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-20"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-2 border-b border-solar-text/20 pb-1">
                <span className="text-[10px] text-solar-text/70 font-sans font-bold tracking-widest">SOLAR POWERED</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500 opacity-50"></div>
                </div>
            </div>

            {/* Results Content */}
            <div className="space-y-1 font-pixel text-solar-text text-shadow-glow">
                <div className="flex justify-between text-xl opacity-80 border-b border-solar-text/10 pb-1">
                    <span>BASE:</span>
                    <span>{result.itemPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-xl opacity-80 border-b border-solar-text/10 pb-1">
                    <span>FEES:</span>
                    <span>{result.fees.toLocaleString('id-ID')}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-4xl font-bold mt-4 pt-2 tracking-wider text-white drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]">
                    <span className="text-solar-text">TOT:</span>
                    <motion.div
                        key={result.total}
                        initial={{ scale: 1.2, color: '#fff' }}
                        animate={{ scale: 1, color: '#fff' }}
                    >
                        {displayTotal.toLocaleString('id-ID')}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
