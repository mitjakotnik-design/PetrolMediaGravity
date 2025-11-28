document.addEventListener('DOMContentLoaded', async () => {
    const rawData = await window.dataLoader.loadCSVData();
    
    const layout = {
        autosize: true,
        paper_bgcolor: 'rgba(10,10,10,0)',
        plot_bgcolor: 'rgba(10,10,10,0)',
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
            xaxis: { title: 'ČAS', gridcolor: 'rgba(255,255,255,0.1)' },
            yaxis: { title: 'MEDIJ', gridcolor: 'rgba(255,255,255,0.1)' },
            zaxis: { title: 'VREDNOST', gridcolor: 'rgba(255,255,255,0.1)' }
        }
    };
    
    const trace = {
        x: [1, 2, 3],
        y: [1, 2, 3],
        z: [1, 2, 3],
        mode: 'markers',
        type: 'scatter3d',
        marker: { size: 8, color: '#FF6B00' }
    };
    
    Plotly.newPlot('chart', [trace], layout, { displayModeBar: false });
});
