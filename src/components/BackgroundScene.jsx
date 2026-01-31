import React from 'react';

const BackgroundScene = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Sky Background is set in body CSS */}

            {/* Clouds */}
            <div className="absolute top-10 left-[-20%] w-32 h-16 bg-white opacity-80 rounded-full animate-[cloud-move_20s_linear_infinite]" />
            <div className="absolute top-32 left-[-10%] w-24 h-12 bg-white opacity-60 rounded-full animate-[cloud-move_25s_linear_infinite_2s]" />
            <div className="absolute top-5 right-[-20%] w-40 h-20 bg-white opacity-90 rounded-full animate-[cloud-move_30s_linear_infinite_5s]" />

            {/* Ground */}
            <div className="absolute bottom-0 w-full h-[120px] bg-[#e86a17] border-t-8 border-[#80d010]">
                {/* Grass details with repeating gradient */}
                <div className="w-full h-4 bg-[repeating-linear-gradient(90deg,#80d010,#80d010_20px,#70c000_20px,#70c000_40px)]" />

                {/* Dirt details */}
                <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#000_2px,_transparent_2.5px)] bg-[length:24px_24px]"></div>
            </div>

            {/* Pixel Trees (CSS Art) */}
            <div className="absolute bottom-[120px] left-10 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[80px] border-l-transparent border-r-transparent border-b-[#20a020]">
                <div className="absolute top-[80px] left-[-10px] w-[20px] h-[30px] bg-[#8B4513]"></div>
            </div>
            <div className="absolute bottom-[120px] right-10 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[100px] border-l-transparent border-r-transparent border-b-[#189018]">
                <div className="absolute top-[100px] left-[-12px] w-[24px] h-[40px] bg-[#8B4513]"></div>
            </div>
        </div>
    );
};

export default BackgroundScene;
