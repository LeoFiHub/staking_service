"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePortfolioChart = generatePortfolioChart;
const chartjs_node_canvas_1 = require("chartjs-node-canvas");
async function generatePortfolioChart() {
    const width = 400;
    const height = 400;
    const chartJSNodeCanvas = new chartjs_node_canvas_1.ChartJSNodeCanvas({ width, height });
    const data = {
        labels: ['Stocks', 'Bonds', 'Real Estate', 'Crypto'],
        datasets: [{
                data: [30, 40, 20, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
    };
    const configuration = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Portfolio Distribution'
                }
            }
        }
    };
    return chartJSNodeCanvas.renderToBuffer(configuration);
}
