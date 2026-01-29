import { useState, useEffect } from 'react';
import { calculateKorea, calculateChina } from './utils/calculator';

export default function App() {
    // API Configuration State
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // User Input State
    const [mode, setMode] = useState('KR'); // 'KR' or 'CH'
    const [inputs, setInputs] = useState({
        price: 0,
        ongkir: 0,
        people: 1
    });

    // Calculation Result State
    const [result, setResult] = useState({
        total: 0,
        itemPrice: 0,
        fees: 0
    });

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
        const { name, value } = e.target;
        // Parse numbers safely, defaulting to 0 if empty/invalid
        const numValue = value === '' ? '' : parseFloat(value);

        setInputs(prev => ({
            ...prev,
            [name]: numValue
        }));
    };

    // 3. Perform Calculation
    useEffect(() => {
        if (!config || loading) return;

        // Use 0 for calculation if input is empty string or NaN
        const safePrice = isNaN(inputs.price) || inputs.price === '' ? 0 : inputs.price;
        const safeOngkir = isNaN(inputs.ongkir) || inputs.ongkir === '' ? 0 : inputs.ongkir;
        const safePeople = isNaN(inputs.people) || inputs.people === '' || inputs.people < 1 ? 1 : inputs.people;

        let calculated;
        if (mode === 'KR') {
            calculated = calculateKorea(safePrice, safeOngkir, safePeople, config);
        } else {
            calculated = calculateChina(safePrice, safeOngkir, safePeople, config);
        }

        setResult(calculated);

    }, [inputs, mode, config, loading]);

    // Render Loading/Error States
    if (loading) return <div className="p-8">Loading configuration...</div>;
    if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-white text-black p-4 font-sans max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">PICHU GO Calculator</h1>

            {/* Mode Switcher */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setMode('KR')}
                    className={`px-4 py-2 rounded border ${mode === 'KR' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    Korea (KRW)
                </button>
                <button
                    onClick={() => setMode('CH')}
                    className={`px-4 py-2 rounded border ${mode === 'CH' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    China (CNY)
                </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Item Price {mode === 'KR' ? '(1 = 1,000 KRW)' : '(CNY)'}
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={inputs.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                        step="0.1"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Domestic Shipping (Ongkir)
                    </label>
                    <input
                        type="number"
                        name="ongkir"
                        value={inputs.ongkir}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                        step="0.1"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        People (Split)
                    </label>
                    <input
                        type="number"
                        name="people"
                        value={inputs.people}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                        step="1"
                        min="1"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 p-4 rounded border">
                <h2 className="text-lg font-bold mb-4">Calculation Result</h2>

                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Item Price (IDR):</span>
                    <span className="font-mono">{result.itemPrice.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Fees & Admin (IDR):</span>
                    <span className="font-mono">{result.fees.toLocaleString('id-ID')}</span>
                </div>

                <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
                    <span>Total (IDR):</span>
                    <span>{result.total.toLocaleString('id-ID')}</span>
                </div>
            </div>

            {/* Debug/Config Info (Optional, helpful for dev) */}
            <details className="mt-8 text-xs text-gray-500">
                <summary>Debug Configuration</summary>
                <pre className="mt-2 bg-gray-100 p-2 rounded">
                    {JSON.stringify(config, null, 2)}
                </pre>
            </details>
        </div>
    );
}
