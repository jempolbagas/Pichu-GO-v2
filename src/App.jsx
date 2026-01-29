// src/App.jsx
import { useState, useEffect } from 'react';
import { calculateKorea, calculateChina } from './utils/calculator';

export default function App() {
    return (
        <div className="min-h-screen p-8 bg-gray-50 text-gray-800">
            <h1 className="text-3xl font-bold">Pichu Go v3 (Blank Canvas)</h1>
            <p className="mt-4">Ready for new design.</p>
        </div>
    );
}
