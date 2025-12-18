document.addEventListener('DOMContentLoaded', async () => {
    console.log(' Starting visualization...');

    try {
        const rawData = await window.dataLoader.loadCSVData();
        console.log(' Data loaded:', rawData.length, 'rows');

        if (rawData.length === 0) {
            console.error(' No data!');
            return;
        }

        console.log(' First row:', rawData[0]);
        console.log(' Columns:', Object.keys(rawData[0]));

        const x = [], y = [], z = [], text = [], colors = [];

        rawData.forEach((row, index) => {
            if (index < 3) console.log(`Row ${index}:`, row);

            const date = row['Date'];
            const medium = row['Media title'];
            const aveNeto = parseFloat(row['AVE neto']) || 0;
            const aveBruto = parseFloat(row['AVE bruto']) || 0;
            const reach = parseFloat(row['Reach']) || 0;

            // Uporabimo AVE bruto ali reach kot višino
            const value = aveBruto || aveNeto || reach || 1;

            if (date && medium && value > 0) {
                x.push(new Date(date).getTime());
                y.push(medium);
                z.push(value);
                colors.push(Math.log10(value + 1)); // Log scale za boljšo vizualizacijo
                text.push(
                    `<b>${medium}</b><br>` +
                    `Datum: ${date}<br>` +
                    `AVE neto: €${aveNeto.toLocaleString()}<br>` +
                    `AVE bruto: €${aveBruto.toLocaleString()}<br>` +
                    `Reach: ${reach.toLocaleString()}`
                );
            }
        });

        console.log(' Processed:', x.length, 'data points');

        if (x.length === 0) {
            console.error(' No valid data points!');
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
                size: 3,
                color: colors,
                colorscale: [
                    [0, '#e0e0e0'],
                    [0.3, '#FF6B00'],
                    [0.7, '#FFD700'],
                    [1, '#FF0000']
                ],
                opacity: 0.7,
                colorbar: {
                    title: 'log(AVE)',
                    thickness: 20,
                    len: 0.7,
                    tickfont: { color: '#333' },
                    titlefont: { color: '#333' }
                }
            },
            hovertemplate: '%{text}<extra></extra>'
        };

        const layout = {
            autosize: true,
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,255,255,0)',
            margin: { l: 0, r: 0, b: 0, t: 0 },
            scene: {
                xaxis: {
                    title: 'ČAS (2013-2025)',
                    gridcolor: 'rgba(0,0,0,0.15)',
                    type: 'date',
                    tickfont: { color: '#333' },
                    titlefont: { color: '#333' }
                },
                yaxis: {
                    title: 'MEDIJ',
                    gridcolor: 'rgba(0,0,0,0.15)',
                    tickfont: { color: '#333' },
                    titlefont: { color: '#333' }
                },
                zaxis: {
                    title: 'AVE VREDNOST (€)',
                    gridcolor: 'rgba(0,0,0,0.15)',
                    type: 'log',
                    tickfont: { color: '#333' },
                    titlefont: { color: '#333' }
                },
                camera: {
                    eye: { x: 1.7, y: 1.7, z: 1.3 },
                    center: { x: 0, y: 0, z: -0.1 }
                }
            },
            hovermode: 'closest'
        };

        const config = {
            displayModeBar: true,
            displaylogo: false,
            modeBarButtonsToRemove: ['toImage'],
            responsive: true
        };

        Plotly.newPlot('chart', [trace], layout, config);
        console.log(' Visualization complete with', x.length, 'points!');

    } catch (error) {
        console.error(' Error:', error);
    }
});
