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
            {/* Label with glowing text effect */}
            <label className="text-xs font-bold uppercase tracking-widest text-purple-200/70 group-hover:text-purple-200 transition-colors">
                {label}
            </label>

            <div className="relative flex items-center">
                {/* Minus Button */}
                <button
                    onClick={onDecrement}
                    className="absolute left-0 z-10 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                    <Minus size={16} />
                </button>

                {/* The Input Field */}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border-b-2 border-white/10 py-4 px-10 text-center text-xl font-bold text-white placeholder-white/20 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all rounded-t-lg"
                />

                {/* Plus Button */}
                <button
                    onClick={onIncrement}
                    className="absolute right-0 z-10 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Help Text */}
            {helpText && (
                <p className="text-[10px] text-white/30 text-center tracking-wide font-medium">
                    {helpText}
                </p>
            )}
        </div>
    );
}