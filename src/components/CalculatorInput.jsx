// src/components/CalculatorInput.jsx
import { Plus, Minus } from 'lucide-react';

export default function CalculatorInput({
                                            label,
                                            value,
                                            onChange,
                                            placeholder,
                                            onIncrement,
                                            onDecrement,
                                            helpText
                                        }) {
    return (
        <div className="flex flex-col gap-2 group">
            {/* Label - Darker gray for visibility on light bg */}
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-purple-500 transition-colors">
                {label}
            </label>

            <div className="relative flex items-center">
                {/* Minus Button - Soft slate icon with pastel hover bg */}
                <button
                    onClick={onDecrement}
                    className="absolute left-0 z-10 p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all active:scale-90"
                >
                    <Minus size={16} />
                </button>

                {/* The Input Field - Milky glass look with dark text */}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-white/60 border-b-2 border-slate-200 py-4 px-10 text-center text-xl font-bold text-slate-700 placeholder-slate-300 focus:outline-none focus:border-purple-400 focus:bg-white transition-all rounded-t-lg shadow-sm"
                />

                {/* Plus Button */}
                <button
                    onClick={onIncrement}
                    className="absolute right-0 z-10 p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all active:scale-90"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Help Text - Muted slate */}
            {helpText && (
                <p className="text-[10px] text-slate-400 text-center tracking-wide font-medium">
                    {helpText}
                </p>
            )}
        </div>
    );
}