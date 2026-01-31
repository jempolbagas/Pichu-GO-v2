import { motion } from "framer-motion";

const Cloud = ({ delay = 0, y, scale = 1, duration = 20 }) => (
    <motion.div
        initial={{ x: "100%", opacity: 0.8 }}
        animate={{ x: "-100%" }}
        transition={{
            repeat: Infinity,
            duration: duration,
            ease: "linear",
            delay: delay,
        }}
        className="absolute"
        style={{ top: y, scale }}
    >
        {/* Simple CSS Pixel Cloud */}
        <div className="relative w-32 h-12 bg-cloud-white">
            <div className="absolute -top-6 left-6 w-12 h-12 bg-cloud-white" />
            <div className="absolute -top-10 left-14 w-16 h-16 bg-cloud-white" />
            <div className="absolute -top-4 right-4 w-14 h-14 bg-cloud-white" />
        </div>
    </motion.div>
);

const Tree = ({ x, scale = 1 }) => (
    <div
        className="absolute bottom-16 z-0"
        style={{ left: x, transform: `scale(${scale})`, imageRendering: 'pixelated' }}
    >
        {/* Pixel Tree Construction using CSS borders/boxes */}
        <div className="flex flex-col items-center">
            {/* Leaves */}
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-grass-green relative -mb-4" />
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[35px] border-b-grass-green relative -mb-4" />
            <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[40px] border-b-grass-green" />

            {/* Trunk */}
            <div className="w-4 h-6 bg-ground-brown" />
        </div>
    </div>
);

export const Background = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-sky-blue">
            {/* Sun/Sky Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-[#2eb5ff] to-[#b3e5fc]" />

            {/* Clouds */}
            <Cloud y="10%" duration={25} />
            <Cloud y="25%" delay={12} duration={30} scale={0.8} />
            <Cloud y="15%" delay={5} duration={28} scale={1.2} />

            {/* Background Trees */}
            <Tree x="5%" scale={0.8} />
            <Tree x="15%" scale={1.1} />
            <Tree x="85%" scale={0.9} />
            <Tree x="92%" scale={1.2} />

            {/* Ground */}
            <div className="absolute bottom-0 w-full h-16 bg-grass-green border-t-4 border-[#3a8523]">
                {/* Grass details */}
                <div className="w-full h-2 bg-[#4c9632] absolute top-0 opacity-50" />
            </div>

            {/* Dirt under grass */}
            <div className="absolute -bottom-10 w-full h-10 bg-ground-brown" />
        </div>
    );
};
