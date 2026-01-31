import React from 'react';

const PixelInput = ({ label, value, onChange, name, type = "text", placeholder, suffix }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block font-pixel text-xl mb-1 text-gray-800 font-bold uppercase tracking-wider relative z-10">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-retro-white border-4 border-[#8b9bb4] focus:border-[#54250b] p-3 font-pixel text-2xl outline-none shadow-[inset_3px_3px_0px_rgba(0,0,0,0.1)] transition-colors placeholder:text-gray-400 text-gray-900"
                />
                {/* Focus Indicator (Optional ring) */}
                <div className="absolute inset-0 border-2 border-transparent pointer-events-none group-focus-within:border-black/10"></div>

                {suffix && (
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-pixel text-xl text-gray-500 font-bold">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
};

export default PixelInput;
