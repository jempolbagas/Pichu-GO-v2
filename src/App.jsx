import { useState, useEffect, useRef, useMemo } from 'react';
import { calculateKorea, calculateChina } from './utils/calculator';
import PixelButton from './components/PixelButton';
import PixelInput from './components/PixelInput';
import BackgroundScene from './components/BackgroundScene';
import ResultCard from './components/ResultCard';
import PixelMascot from './components/PixelMascot';

export default function App() {
    // API Configuration State
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // User Input State
    const [mode, setMode] = useState('KR'); // 'KR' or 'CH'
    const [inputs, setInputs] = useState({
        price: '',
        ongkir: '',
        people: ''
    });

    // Customization State
    const [theme, setTheme] = useState('wood'); // wood, purple, pink, teal
    const [mascotMood, setMascotMood] = useState('idle');

    // Calculation Result State
    const [result, setResult] = useState({
        total: 0,
        itemPrice: 0,
        fees: 0
    });

    // --- Audio Logic ---
    const playBeep = (freq = 440, type = 'square', duration = 0.1) => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    const handleThemeChange = (newTheme) => {
        playBeep(600, 'triangle', 0.1);
        setTheme(newTheme);
    };

    // Calculate Dynamic Styles for the Shell
    const shellStyles = useMemo(() => {
        const maps = {
            wood: { bg: 'bg-retro-wood', border: 'border-[#54250b]', accent: 'bg-[#54250b]' },
            purple: { bg: 'bg-shell-purple', border: 'border-indigo-900', accent: 'bg-indigo-900' },
            pink: { bg: 'bg-shell-pink', border: 'border-rose-900', accent: 'bg-rose-900' },
            teal: { bg: 'bg-shell-teal', border: 'border-teal-900', accent: 'bg-teal-900' },
        };
        return maps[theme] || maps.wood;
    }, [theme]);


    // Default Config for Fallback (Local Dev / API Failure)
    const DEFAULT_CONFIG = {
        admin_go: 7000,
        rate_kr: 11.80,
        jasa_tf_kr: 7000,
        ongkir_kr_default: 2000,
        rate_ch: 2460,
        jasa_tf_ch: 10000,
        ongkir_ch_default: 8
    };

    // 1. Fetch Configuration on Mount
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/rates');
                const contentType = res.headers.get("content-type");

                if (res.ok && contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    setConfig(data);
                } else {
                    console.warn("API unavailable or returned non-JSON (likely local dev). Using default config.");
                    setConfig(DEFAULT_CONFIG);
                }
            } catch (err) {
                console.warn("Config fetch failed. Using default config.", err);
                setConfig(DEFAULT_CONFIG);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    // 2. Handle Input Changes
    const handleInputChange = (e) => {
        // playBeep(200, 'sine', 0.05); // Typematic sound (optional, might be annoying if too loud)
        const { name, value } = e.target;
        const newValue = value === '' ? '' : value;

        setInputs(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    // 3. Perform Calculation
    useEffect(() => {
        if (!config || loading) return;

        const val = (v) => (v === '' || isNaN(parseFloat(v)) ? 0 : parseFloat(v));

        const safePrice = val(inputs.price);
        const safeOngkir = val(inputs.ongkir);
        const safePeople = val(inputs.people);

        const calcPeople = safePeople < 1 ? 1 : safePeople;

        let calculated;
        if (mode === 'KR') {
            calculated = calculateKorea(safePrice, safeOngkir, calcPeople, config);
        } else {
            calculated = calculateChina(safePrice, safeOngkir, calcPeople, config);
        }

        setResult(calculated);

        // Mascot Logic
        if (calculated.total > 10000000) { // Big money
            setMascotMood('shocked');
        } else if (safePrice > 0) {
            setMascotMood('happy');
            if (safePrice > 0 && safePrice !== result.itemPrice) playBeep(880, 'square', 0.2); // Success sound on change
        } else {
            setMascotMood('idle');
        }

    }, [inputs, mode, config, loading]);

    // Render Loading/Error States
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center text-white font-retro animate-pulse bg-pixel-bg">
            LOADING WORLD...
        </div>
    );

    if (error) return <div className="p-8 text-red-600 bg-white font-bold">Error: {error}</div>;

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center py-10 px-4 overflow-hidden">
            <BackgroundScene />

            {/* PICHU Title Floating */}
            <div className="absolute top-10 animate-float z-20">
                <h1 className="font-retro text-4xl md:text-6xl text-[#fca048] drop-shadow-[4px_4px_0_#000] leading-tight text-center">
                    GO<br />PICHU
                </h1>
                <div className="mt-2 text-white font-pixel text-xl bg-black/50 px-3 py-1 rounded mx-auto w-fit">
                    Level 2.0
                </div>
            </div>

            {/* DEVICE FRAME */}
            <div className={`relative z-10 ${shellStyles.bg} p-3 md:p-5 rounded-3xl shadow-[0_20px_0_rgb(0,0,0,0.3),_inset_0_-8px_0_rgba(0,0,0,0.2)] border-b-8 border-r-8 ${shellStyles.border} max-w-md w-full mt-36 transition-colors duration-500`}>

                {/* MASCOT (Perched on device) */}
                <div className="absolute -top-12 -right-4 z-20 pointer-events-none">
                    <PixelMascot mood={mascotMood} />
                </div>

                {/* Device Bevel Highlights */}
                <div className="absolute top-4 left-4 w-full h-[2px] bg-white/20 rounded-full"></div>

                {/* SCREEN CONTAINER */}
                <div className={`bg-[#b8c2b9] p-4 rounded-xl border-4 ${shellStyles.border} shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] transition-colors duration-500`}>

                    {/* Inner Screen Area */}
                    <div className="bg-retro-white rounded-lg p-4 shadow-md border-2 border-dashed border-gray-300">

                        {/* Mode Switcher */}
                        <div className="flex gap-4 mb-6 justify-center">
                            <PixelButton
                                onClick={() => { playBeep(); setMode('KR'); }}
                                active={mode === 'KR'}
                                variant={mode === 'KR' ? 'primary' : 'secondary'}
                            >
                                KRW
                            </PixelButton>
                            <PixelButton
                                onClick={() => { playBeep(); setMode('CH'); }}
                                active={mode === 'CH'}
                                variant={mode === 'CH' ? 'primary' : 'secondary'}
                            >
                                CNY
                            </PixelButton>
                        </div>

                        {/* Inputs */}
                        <div className="space-y-4">
                            <PixelInput
                                label={`Item Price ${mode === 'KR' ? '(x1000)' : '(¥)'}`}
                                name="price"
                                value={inputs.price}
                                onChange={handleInputChange}
                                placeholder="0"
                                type="number"
                                suffix={mode === 'KR' ? '₩' : '¥'}
                            />

                            <PixelInput
                                label="Domestic Shipping"
                                name="ongkir"
                                value={inputs.ongkir}
                                onChange={handleInputChange}
                                placeholder="0"
                                type="number"
                            />

                            <PixelInput
                                label="Split People"
                                name="people"
                                value={inputs.people}
                                onChange={handleInputChange}
                                placeholder="1"
                                type="number"
                            />
                        </div>

                        {/* RESULT CARD (Solar Screen) */}
                        <ResultCard result={result} />

                    </div>
                </div>

                {/* Device Controls (Theme Switcher) */}
                <div className="mt-4 flex justify-between items-center px-4">
                    {/* Theme Swatches */}
                    <div className="flex gap-2 p-1 bg-black/20 rounded-full">
                        <button onClick={() => handleThemeChange('wood')} className="w-4 h-4 rounded-full bg-[#78350f] border border-white/50 hover:scale-110 transition-transform" />
                        <button onClick={() => handleThemeChange('purple')} className="w-4 h-4 rounded-full bg-[#8b5cf6] border border-white/50 hover:scale-110 transition-transform" />
                        <button onClick={() => handleThemeChange('pink')} className="w-4 h-4 rounded-full bg-[#ec4899] border border-white/50 hover:scale-110 transition-transform" />
                        <button onClick={() => handleThemeChange('teal')} className="w-4 h-4 rounded-full bg-[#14b8a6] border border-white/50 hover:scale-110 transition-transform" />
                    </div>

                    <button
                        onClick={() => { playBeep(300, 'sawtooth'); setInputs({ price: '', ongkir: '', people: '' }); }}
                        className={`text-xs font-retro text-black/50 hover:text-black transition-colors uppercase`}
                    >
                        RESET
                    </button>
                </div>
            </div>

            {/* Footer / Signpost */}
            <div className="mt-12 relative z-0 group cursor-default">
                {/* Signpost Pole */}
                <div className="w-4 h-16 bg-[#54250b] mx-auto -mb-2 border-x-2 border-black/30"></div>
                {/* Signpost Board */}
                <div className="bg-retro-wood px-6 py-3 rounded border-4 border-[#54250b] shadow-[4px_4px_0_rgba(0,0,0,0.3)] transform -rotate-2 group-hover:rotate-0 transition-transform">
                    <p className="text-white font-pixel text-lg">HANDLED BY PICHU</p>
                    <p className="text-[#fca048] text-xs font-retro text-center mt-1">© 2026</p>
                </div>
            </div>
        </div>
    );
}
