// src/App.jsx
import { useState, useEffect } from 'react';
import CalculatorInput from './components/CalculatorInput';
import { calculateKorea, calculateChina } from './utils/calculator';
import { Flag } from 'lucide-react';

export default function App() {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState('KR'); // 'KR' or 'CN'
    const [price, setPrice] = useState('');
    const [ongkir, setOngkir] = useState('');
    const [people, setPeople] = useState(1);
    const [result, setResult] = useState({ total: 0, itemPrice: 0, fees: 0 });

    // --- CONFIG (Hardcoded for now) ---
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

    // Handlers for Steppers
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

    return (
        <div className="min-h-screen flex flex-col items-center pt-10 pb-12 px-4 font-sans text-slate-800">

            {/* HEADER */}
            <h1 className="text-[2.5rem] font-black text-[#B83280] mb-8 tracking-tight drop-shadow-sm text-center uppercase">
                Pichu Go Calculator
            </h1>

            {/* TABS (Pill Shape) */}
            <div className="bg-white/40 backdrop-blur-md p-1.5 rounded-full flex gap-1 mb-6 shadow-sm border border-white/50">
                <button
                    onClick={() => handleTabChange('KR')}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-full font-bold transition-all text-sm ${
                        isKr ? 'bg-[#D53F8C] text-white shadow-md' : 'text-gray-600 hover:bg-white/40'
                    }`}
                >
                    🇰🇷 Korea
                </button>
                <button
                    onClick={() => handleTabChange('CN')}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-full font-bold transition-all text-sm ${
                        !isKr ? 'bg-[#C53030] text-white shadow-md' : 'text-gray-600 hover:bg-white/40'
                    }`}
                >
                    🇨🇳 China
                </button>
            </div>

            {/* EXCHANGE RATE PILL */}
            <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl text-sm font-bold text-[#805AD5] mb-8 shadow-sm border border-white/50 w-full max-w-2xl text-center">
                💱 Exchange Rate: 1 {isKr ? 'KRW' : 'CNY'} = {isKr ? config.rate_kr : config.rate_ch} IDR
            </div>

            {/* MAIN GRID LAYOUT */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">

                {/* LEFT COL: INPUTS */}
                <div className="flex flex-col">
                    <CalculatorInput
                        label={isKr ? "💰 Harga Produk (0.1 = 1,000 Won)" : "💰 Harga Produk (Yuan)"}
                        value={price}
                        onChange={setPrice}
                        placeholder="0.00"
                        onIncrement={() => adjustValue(setPrice, price, isKr ? 0.01 : 1, isKr)}
                        onDecrement={() => adjustValue(setPrice, price, isKr ? -0.01 : -1, isKr)}
                        helpText={isKr ? "Example: Enter 1.0 for 10,000 KRW" : "Enter exact Yuan price"}
                    />

                    <CalculatorInput
                        label={isKr ? "🚚 Ongkir Lokal Korea (Won)" : "🚚 Ongkir Lokal China (Yuan)"}
                        value={ongkir}
                        onChange={setOngkir}
                        placeholder={isKr ? config.ongkir_kr_default : config.ongkir_ch_default}
                        onIncrement={() => adjustValue(setOngkir, ongkir || (isKr ? 2000 : 10), isKr ? 500 : 1)}
                        onDecrement={() => adjustValue(setOngkir, ongkir || (isKr ? 2000 : 10), isKr ? -500 : -1)}
                        helpText="Shipping fee to warehouse"
                    />
                </div>

                {/* RIGHT COL: SLIDER */}
                <div className="flex flex-col justify-start pt-2">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            👥 Jumlah Sharing (Orang)
                            <div className="group relative">
                                <div className="absolute left-full top-0 ml-2 w-32 bg-gray-800 text-white text-xs rounded p-2 hidden group-hover:block">
                                    Total people in GO
                                </div>
                            </div>
                        </label>
                        <span className="text-2xl font-black text-[#D53F8C]">{people}</span>
                    </div>

                    <div className="h-12 flex items-center bg-white/50 rounded-full px-4 border border-pink-100">
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={people}
                            onChange={(e) => setPeople(e.target.value)}
                            className="w-full accent-[#D53F8C] h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* RESULT CARD (Solid White) */}
            <div className="w-full max-w-2xl bg-white rounded-[2rem] p-10 text-center shadow-[0_20px_40px_-15px_rgba(213,63,140,0.3)] relative overflow-hidden">
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#97266D] flex items-center justify-center gap-2">
                    {isKr ? <Flag size={14} /> : '🇨🇳'} {isKr ? 'Korea' : 'China'} Estimated Total
                </p>

                <h2 className="text-6xl font-black text-[#702459] mb-6 tracking-tighter">
                    Rp {result.total.toLocaleString('id-ID')}
                </h2>

                <div className="inline-flex items-center gap-6 bg-pink-50 px-8 py-3 rounded-full text-sm font-bold text-[#702459]">
          <span className="flex items-center gap-2">
            📦 Price: {result.itemPrice.toLocaleString('id-ID')}
          </span>
                    <span className="text-pink-300">•</span>
                    <span className="flex items-center gap-2">
            ✈️ Fees: {result.fees.toLocaleString('id-ID')}
          </span>
                </div>
            </div>

        </div>
    );
}