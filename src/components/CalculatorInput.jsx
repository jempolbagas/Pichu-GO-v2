// src/components/CalculatorInput.jsx
import React from 'react';
import { Minus, Plus, HelpCircle } from 'lucide-react'; // Make sure to install: npm install lucide-react

export default function CalculatorInput({
                                            label,
                                            value,
                                            onChange,
                                            onIncrement,
                                            onDecrement,
                                            placeholder,
                                            helpText
                                        }) {
    return (
        <div className="mb-6">
            {/* Label Row */}
            <div className="flex items-center gap-2 mb-2 ml-1">
                <span className="text-sm font-bold text-gray-700">{label}</span>
                {helpText && (
                    <div className="group relative">
                        <HelpCircle size={16} className="text-gray-400 cursor-help" />
                        <div className="absolute left-full top-0 ml-2 w-48 bg-gray-800 text-white text-xs rounded p-2 hidden group-hover:block z-10">
                            {helpText}
                        </div>
                    </div>
                )}
            </div>

            {/* Input Capsule */}
            <div className="bg-white rounded-full flex items-center p-1 shadow-sm border border-pink-100 focus-within:ring-2 focus-within:ring-pink-400 transition-all h-12">
                {/* Text Input */}
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="bg-transparent w-full pl-6 font-bold text-gray-700 outline-none text-lg placeholder-gray-300"
                />

                {/* Stepper Buttons */}
                <div className="flex items-center gap-1 pr-1">
                    <button
                        onClick={onDecrement}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-200 transition-colors active:scale-95"
                    >
                        <Minus size={16} strokeWidth={3} />
                    </button>
                    <button
                        onClick={onIncrement}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-200 transition-colors active:scale-95"
                    >
                        <Plus size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
}