// src/components/ResultCard.jsx
import React from 'react';
import { ShoppingBag, Plane, Copy, Check } from 'lucide-react';

export default function ResultCard({ result, isKr }) {
    const [copied, setCopied] = React.useState(false);

    // Helper to copy the total to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(`Rp ${result.total.toLocaleString('id-ID')}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex-1 bg-white/70 backdrop-blur-2xl rounded-3xl p-8 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 relative overflow-hidden group">

            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

            {/* Header */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
                        Estimated Total
                    </p>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-full hover:bg-white/50 text-gray-400 hover:text-pink-600 transition-colors"
                        title="Copy Total"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>

                {/* Big Total */}
                <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-8">
                    <span className="text-2xl align-top opacity-50 font-bold mr-1">Rp</span>
                    {result.total.toLocaleString('id-ID')}
                </h2>
            </div>

            {/* Breakdown Cards */}
            <div className="relative z-10 space-y-3">
                {/* Item Price */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-pink-100/50 hover:bg-white/80 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 rounded-lg text-pink-500">
                            <ShoppingBag size={18} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">Base Price</span>
                    </div>
                    <span className="font-bold text-gray-800">
            {result.itemPrice.toLocaleString('id-ID')}
          </span>
                </div>

                {/* Fees */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-indigo-100/50 hover:bg-white/80 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-500">
                            <Plane size={18} />
                        </div>
                        <span className="text-sm font-bold text-gray-600">Intl. Fees</span>
                    </div>
                    <span className="font-bold text-gray-800">
            {result.fees.toLocaleString('id-ID')}
          </span>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="relative z-10 mt-8 pt-6 border-t border-gray-200/50">
                <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed">
                    *Estimasi harga (belum termasuk pajak/ems). <br/>
                    Harga final saat tagihan.
                </p>
            </div>
        </div>
    );
}