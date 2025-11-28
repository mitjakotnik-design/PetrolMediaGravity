function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(';');
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(';');
        const obj = {};
        headers.forEach((h, idx) => { obj[h.trim()] = values[idx]?.trim() || ''; });
        if (obj['Date']) data.push(obj);
    }
    return data;
}

async function loadCSVData() {
    try {
        const response = await fetch('data/petrol_2013-2025.csv');
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error('Error loading CSV:', error);
        return [];
    }
}

window.dataLoader = { loadCSVData };
