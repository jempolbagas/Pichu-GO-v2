// api/rates.js
export const config = {
    runtime: 'edge',
};

// ... keep DEFAULT_CONFIG as is ...
const DEFAULT_CONFIG = {
    admin_go: 7000,
    rate_kr: 11.80,
    jasa_tf_kr: 7000,
    ongkir_kr_default: 2000,
    rate_ch: 2460,
    jasa_tf_ch: 10000,
    ongkir_ch_default: 8
};

export default async function handler(req) {
    // CHANGED: Use the full URL from environment variable
    const csvUrl = process.env.SHEET_CSV_URL;

    if (!csvUrl) {
        return new Response(JSON.stringify(DEFAULT_CONFIG), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error('Failed to fetch CSV');

        const csvText = await response.text();
        const finalConfig = { ...DEFAULT_CONFIG };

        csvText.split('\n').forEach((line) => {
            const [key, value] = line.split(',');
            if (key && value) {
                const cleanKey = key.trim();
                const cleanValue = parseFloat(value.trim());
                if (!isNaN(cleanValue)) {
                    finalConfig[cleanKey] = cleanValue;
                }
            }
        });

        return new Response(JSON.stringify(finalConfig), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
            },
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify(DEFAULT_CONFIG), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}