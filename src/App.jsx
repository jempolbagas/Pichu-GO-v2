// src/App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalculatorInput from './components/CalculatorInput';
import { calculateKorea, calculateChina } from './utils/calculator';
import { Sparkles } from 'lucide-react';

export default function App() {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('KR');
    const [price, setPrice] = useState('');
    const [ongkir, setOngkir] = useState('');
    const [people, setPeople] = useState(1);
    const [result, setResult] = useState({ total: 0, itemPrice: 0, fees: 0 });

    // --- CONFIG ---
    const config = {
        rate_kr: 11.75,
        jasa_tf_kr: 6000,
        admin_go: 6000,
        ongkir_kr_default: 2000,
        rate_ch: 2450,
        jasa_tf_ch: 10000,
        ongkir_ch_default: 100
    };

    // --- LOGIC ---
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

    // Animation Variants
    const slideAnimation = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { duration: 0.3 }
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-12 pb-12 px-4 font-sans text-slate-700 overflow-x-hidden">

            {/* HEADER */}
            <div className="relative mb-10 text-center">
                {/* Softened glow behind header */}
                <div className="absolute -inset-4 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
                <h1 className="relative text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 drop-shadow-sm">
                    Pichu Go
                </h1>
                <p className="text-slate-500 text-sm font-semibold tracking-widest mt-2 uppercase">
                    Calculator 2.0
                </p>
            </div>

            {/* ANIMATED TABS */}
            {/* Switched to Milky White Glass */}
            <div className="bg-white/40 backdrop-blur-md p-1.5 rounded-full flex gap-1 mb-8 shadow-lg shadow-purple-100/50 border border-white/60 relative z-10">
                {['KR', 'CN'].map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`relative px-8 py-3 rounded-full font-bold text-sm transition-colors duration-300 focus:outline-none flex items-center gap-2 ${
                                isActive ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {/* The Sliding Pill Background - Brighter White */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white border border-white/80 rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Tab Text & Icon */}
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
                className="bg-white/40 backdrop-blur-sm px-6 py-2 rounded-xl text-xs font-bold text-slate-500 mb-8 border border-white/50 tracking-wider uppercase shadow-sm"
            >
                Currently using: 1 {isKr ? 'KRW' : 'CNY'} = <span className="text-slate-800 text-base mx-1">{isKr ? config.rate_kr : config.rate_ch}</span> IDR
            </motion.div>

            {/* MAIN GRID LAYOUT */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">

                {/* LEFT COL: ANIMATED INPUTS */}
                <div className="relative">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            variants={slideAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex flex-col gap-6"
                        >
                            {/* NOTE: You will likely need to update your CalculatorInput.jsx component
                                to remove any hardcoded "text-white" or "bg-white/10" classes inside it.
                                Passes props or context normally, but check that file next if inputs look dark.
                            */}
                            <CalculatorInput
                                label={isKr ? "Product Price (0.1 = 1k Won)" : "Product Price (Yuan)"}
                                value={price}
                                onChange={setPrice}
                                placeholder="0.00"
                                onIncrement={() => adjustValue(setPrice, price, isKr ? 0.01 : 1, isKr)}
                                onDecrement={() => adjustValue(setPrice, price, isKr ? -0.01 : -1, isKr)}
                                helpText={isKr ? "Example: 1.0 = 10,000 KRW" : "Price in Yuan (CNY)"}
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
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-6">
                        <label className="text-sm font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider">
                            👥 Sharing (Pax)
                        </label>
                        <span className="text-4xl font-black text-slate-700">
                            {people}
                        </span>
                    </div>

                    <div className="h-14 flex items-center bg-white/40 rounded-2xl px-2 border border-white/50 relative overflow-hidden group shadow-inner">
                        <div className="absolute left-0 top-0 bottom-0 bg-white/40 w-full pointer-events-none group-hover:bg-white/60 transition-colors"></div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-400 relative z-10"
                        />
                    </div>
                </div>
            </div>

            {/* RESULT CARD */}
            <div className="w-full max-w-xl relative group">
                {/* Background Glow Blob - Softened */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>

                <div className="relative bg-white/60 backdrop-blur-2xl rounded-[2rem] p-10 text-center border border-white/80 shadow-2xl shadow-purple-100/20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

                    <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-slate-400 flex items-center justify-center gap-2">
                        {isKr ? 'Korea' : 'China'} Estimated Total
                    </p>

                    <motion.h2
                        key={result.total}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl md:text-7xl font-black text-slate-800 mb-8 tracking-tighter"
                    >
                        <span className="text-2xl align-top opacity-40 font-medium mr-2">Rp</span>
                        {result.total.toLocaleString('id-ID')}
                    </motion.h2>

                    <div className="inline-flex items-center gap-6 bg-white/50 px-8 py-4 rounded-full text-sm font-bold text-slate-600 border border-white/60 shadow-sm">
                        <span className="flex items-center gap-2">
                            📦 Item: {result.itemPrice.toLocaleString('id-ID')}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-2">
                            ✈️ Fees: {result.fees.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-12 text-slate-400 text-xs font-medium tracking-widest uppercase">
                Not official • Estimate only
            </div>
        </div>
    );
}