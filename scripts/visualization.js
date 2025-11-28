document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Starting visualization...');
    
    try {
        const rawData = await window.dataLoader.loadCSVData();
        console.log('📊 Data loaded:', rawData.length, 'rows');
        
        if (rawData.length === 0) {
            console.error('❌ No data!');
            return;
        }
        
        console.log('📋 First row:', rawData[0]);
        console.log('📋 Columns:', Object.keys(rawData[0] || {}));
        
        // Procesiranje podatkov
        const x = [], y = [], z = [], text = [];
        
        rawData.forEach((row, index) => {
            if (index < 3) console.log(`Row ${index}:`, row);
            
            if (row.Date && row.Medium) {
                x.push(new Date(row.Date).getTime());
                y.push(row.Medium);
                const value = parseFloat(row.AVE || row.Reach || 0);
                z.push(value);
                text.push(`${row.Medium}<br>${row.Date}<br>AVE: ${row.AVE || 'N/A'}`);
            }
        });
        
        console.log('✅ Processed:', x.length, 'data points');
        
        if (x.length === 0) {
            console.error('❌ No valid data points!');
            return;
        }
        
        const trace = {
            x: x,
            y: y,
            z: z,
            text: text,
            mode: 'markers',
            type: 'scatter3d',
            marker: { 
                size: 4,
                color: z,
                colorscale: 'Hot',
                opacity: 0.7,
                line: { width: 0 }
            },
            hoverinfo: 'text'
        };
        
        const layout = {
            autosize: true,
            paper_bgcolor: 'rgba(10,10,10,0)',
            plot_bgcolor: 'rgba(10,10,10,0)',
            margin: { l: 0, r: 0, b: 0, t: 0 },
            scene: {
                xaxis: { 
                    title: 'ČAS', 
                    gridcolor: 'rgba(255,255,255,0.1)',
                    type: 'date'
                },
                yaxis: { 
                    title: 'MEDIJ', 
                    gridcolor: 'rgba(255,255,255,0.1)'
                },
                zaxis: { 
                    title: 'AVE VREDNOST', 
                    gridcolor: 'rgba(255,255,255,0.1)'
                },
                camera: { eye: { x: 1.5, y: 1.5, z: 1.3 } }
            }
        };
        
        Plotly.newPlot('chart', [trace], layout, { displayModeBar: false });
        console.log('🎉 Visualization complete!');
        
    } catch (error) {
        console.error('❌ Error:', error);
    }
});
