async function getData() {
    const response = await fetch('data/data.csv');    // fetch data from csv
    const data = await response.text();

    const rows = data.split('\n');                  // create rows (labels, means, stdevs)
    
    const meanVals = rows[1].split(',');            // create an array of means
    const stDevs = rows[2].split(',');              // create an array of stdevs

    console.log(meanVals, stDevs);

    const chartData = [];
    for (i = 0; i < 8; i++) {                       // for each x-value, push the mean, min, and max
        chartData.push({
            y: Number(meanVals[i]),
            yMin: Number(meanVals[i]) - Number(stDevs[i]),
            yMax: Number(meanVals[i]) + Number(stDevs[i])
        })
    }

    return chartData;
}

async function createChart() {
    const data = await getData();
    const barChart = document.getElementById('barChart');
    
    const myChart = new Chart(barChart, {           // create an error bar chart
        type: 'barWithErrorBars',
        data: {
            labels: [                               // labels for each bar
                'Red Light (Chlorophyll)',
                'Blue Light (Chlorophyll)',
                'Green Light (Chlorophyll)',
                'White Light (Chlorophyll)',
                'Red Light (Brassica rapa)',
                'Blue Light (Brassica rapa)',
                'Green Light (Brassica rapa)',
                'White Light (Brassica rapa)',
            ],
            datasets: [{                            // label for the tooltip and bar styling
                label: 'Mean Saturation Percent Change (%)',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgb(0, 127, 0)',
                    'rgba(127, 127, 127, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgb(0, 127, 0)',
                    'rgba(127, 127, 127, 1)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {                            // configure max and min for the chart y-values
                    max: 0,
                    min: -100,
                    beginAtZero: true,
                    title: {                    // set a y-axis title
                        display: true,
                        text: 'Mean Saturation Percent Change (%)'
                    }
                },
            },
            plugins: {                          // remove legend but keep functioning tooltip
                title: {
                    display: true,
                    text: 'Mean Saturation Change Under Different Wavelengths',
                    font: {
                        size: 24
                    },
                    color: '#black',
                    padding: {
                        bottom: 30,
                        top: 30
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    })
}

createChart();  // call createChart() to generate it