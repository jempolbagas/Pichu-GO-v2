// src/App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalculatorInput from './components/CalculatorInput';
import { calculateKorea, calculateChina } from './utils/calculator';
import { Sparkles, ChevronUp } from 'lucide-react'; // Added Chevron for mobile drawer hint

export default function App() {
    // ... (Keep existing state and config exactly as before) ...
    const [activeTab, setActiveTab] = useState('KR');
    const [price, setPrice] = useState('');
    const [ongkir, setOngkir] = useState('');
    const [people, setPeople] = useState(1);
    const [result, setResult] = useState({ total: 0, itemPrice: 0, fees: 0 });

    const config = {
        rate_kr: 11.75,
        jasa_tf_kr: 6000,
        admin_go: 6000,
        ongkir_kr_default: 2000,
        rate_ch: 2450,
        jasa_tf_ch: 10000,
        ongkir_ch_default: 100
    };

    // ... (Keep existing logic functions: isKr, adjustValue, useEffect, etc.) ...
    const isKr = activeTab === 'KR';

    const adjustValue = (setter, currentVal, step, isFloat = false) => {
        const num = parseFloat(currentVal) || 0;
        const newVal = Math.max(0, num + step);
        setter(isFloat ? newVal.toFixed(2) : Math.round(newVal).toString());
    };

    useEffect(() => {
        const numPrice = parseFloat(price) || 0;
        const numOngkir = ongkir === ''
            ? (isKr ? config.ongkir_kr_default : config.ongkir_ch_default)
            : parseFloat(ongkir);
        const numPeople = parseInt(people) || 1;

        if (isKr) {
            setResult(calculateKorea(numPrice, numOngkir, numPeople, config));
        } else {
            setResult(calculateChina(numPrice, numOngkir, numPeople, config));
        }
    }, [price, ongkir, people, activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPrice('');
        setOngkir('');
        setPeople(1);
    };

    const slideAnimation = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.3 }
    };

    return (
        // MOBILE FIX: Reduced vertical padding (pt-6) and added padding-bottom for sticky footer (pb-32)
        <div className="min-h-screen flex flex-col items-center pt-6 pb-32 md:pt-12 md:pb-12 px-4 font-sans text-slate-700 overflow-x-hidden relative">

            {/* HEADER */}
            <div className="relative mb-6 md:mb-10 text-center">
                <div className="absolute -inset-4 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
                {/* MOBILE FIX: Smaller text (text-3xl) on mobile, larger (text-5xl) on desktop */}
                <h1 className="relative text-3xl md:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 drop-shadow-sm">
                    Pichu Go
                </h1>
                <p className="text-slate-500 text-xs md:text-sm font-semibold tracking-widest mt-2 uppercase">
                    Calculator 2.0
                </p>
            </div>

            {/* ANIMATED TABS */}
            {/* MOBILE FIX: w-full max-w-sm to ensure it fits mobile width but doesn't stretch too far */}
            <div className="w-full max-w-sm bg-white/40 backdrop-blur-md p-1.5 rounded-full flex gap-1 mb-6 md:mb-8 shadow-lg shadow-purple-100/50 border border-white/60 relative z-10">
                {['KR', 'CN'].map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            // MOBILE FIX: Added 'flex-1 justify-center' so tabs split width equally
                            className={`relative flex-1 justify-center py-3 rounded-full font-bold text-sm transition-colors duration-300 focus:outline-none flex items-center gap-2 ${
                                isActive ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white border border-white/80 rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {isActive && (
                                    <Sparkles
                                        size={14}
                                        className={tab === 'KR' ? 'text-pink-400' : 'text-blue-400'}
                                    />
                                )}
                                {tab === 'KR' ? '🇰🇷 Korea' : '🇨🇳 China'}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* EXCHANGE RATE */}
            <motion.div
                key={activeTab + 'rate'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                // MOBILE FIX: Smaller text/padding on mobile
                className="bg-white/40 backdrop-blur-sm px-4 py-1.5 md:px-6 md:py-2 rounded-xl text-[10px] md:text-xs font-bold text-slate-500 mb-6 md:mb-8 border border-white/50 tracking-wider uppercase shadow-sm"
            >
                Rate: 1 {isKr ? 'KRW' : 'CNY'} = <span className="text-slate-800 text-sm md:text-base mx-1">{isKr ? config.rate_kr : config.rate_ch}</span> IDR
            </motion.div>

            {/* MAIN GRID LAYOUT */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-12">

                {/* LEFT COL: INPUTS */}
                <div className="relative">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            variants={slideAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex flex-col gap-5 md:gap-6"
                        >
                            <CalculatorInput
                                label={isKr ? "Product Price (0.1 = 1k Won)" : "Product Price (Yuan)"}
                                value={price}
                                onChange={setPrice}
                                placeholder="0.00"
                                onIncrement={() => adjustValue(setPrice, price, isKr ? 0.01 : 1, isKr)}
                                onDecrement={() => adjustValue(setPrice, price, isKr ? -0.01 : -1, isKr)}
                                helpText={isKr ? "Ex: 1.0 = 10,000 KRW" : "Price in Yuan (CNY)"}
                            />

                            <CalculatorInput
                                label={isKr ? "Local Shipping (Won)" : "Local Shipping (Yuan)"}
                                value={ongkir}
                                onChange={setOngkir}
                                placeholder={isKr ? config.ongkir_kr_default : config.ongkir_ch_default}
                                onIncrement={() => adjustValue(setOngkir, ongkir || (isKr ? 2000 : 10), isKr ? 500 : 1)}
                                onDecrement={() => adjustValue(setOngkir, ongkir || (isKr ? 2000 : 10), isKr ? -500 : -1)}
                                helpText="Shipping to Warehouse"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT COL: SLIDER */}
                <div className="flex flex-col justify-center px-2 md:px-0">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <label className="text-xs md:text-sm font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider">
                            👥 Sharing (Pax)
                        </label>
                        <span className="text-3xl md:text-4xl font-black text-slate-700">
                            {people}
                        </span>
                    </div>

                    <div className="h-12 md:h-14 flex items-center bg-white/40 rounded-2xl px-2 border border-white/50 relative overflow-hidden group shadow-inner">
                        <div className="absolute left-0 top-0 bottom-0 bg-white/40 w-full pointer-events-none group-hover:bg-white/60 transition-colors"></div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                            // MOBILE FIX: Ensure touch target is accessible
                            className="w-full h-full opacity-0 absolute z-20 cursor-pointer"
                        />
                        {/* Visual representation of the slider track */}
                        <div className="w-full h-2 bg-slate-200 rounded-lg relative z-10 overflow-hidden pointer-events-none">
                            <div
                                className="h-full bg-gradient-to-r from-purple-300 to-pink-300"
                                style={{ width: `${(people / 50) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* DESKTOP RESULT CARD (Hidden on mobile to save space) */}
            <div className="hidden md:block w-full max-w-xl relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 text-center border border-white/80 shadow-2xl shadow-purple-100/20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-slate-400">
                        {isKr ? 'Korea' : 'China'} Estimated Total
                    </p>
                    <h2 className="text-7xl font-black text-slate-800 mb-8 tracking-tighter">
                        <span className="text-2xl align-top opacity-40 font-medium mr-2">Rp</span>
                        {result.total.toLocaleString('id-ID')}
                    </h2>
                    <div className="inline-flex items-center gap-6 bg-white/50 px-8 py-4 rounded-full text-sm font-bold text-slate-600 border border-white/60 shadow-sm">
                        <span>📦 Item: {result.itemPrice.toLocaleString('id-ID')}</span>
                        <span className="text-slate-300">|</span>
                        <span>✈️ Fees: {result.fees.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            </div>

            {/* MOBILE STICKY FOOTER (Visible only on small screens) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                {/* Glassmorphism Panel */}
                <div className="bg-white/80 backdrop-blur-xl border-t border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2rem] p-6 pb-8">
                    <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" /> {/* Pull handle visual */}

                    <div className="flex justify-between items-end mb-2">
                        <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Total</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-purple-500">Rp</span>
                                <span className="text-4xl font-black text-slate-800 tracking-tight">
                                    {result.total.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Mini breakdown for mobile */}
                        <div className="text-right text-[10px] font-medium text-slate-500 space-y-1">
                            <div>Item: {result.itemPrice.toLocaleString('id-ID')}</div>
                            <div>Fees: {result.fees.toLocaleString('id-ID')}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-slate-400 text-[10px] font-medium tracking-widest uppercase md:mt-12">
                Not official • Estimate only
            </div>
        </div>
    );
}