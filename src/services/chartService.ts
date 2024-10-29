import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { ChartConfiguration, ChartData } from 'chart.js';

export async function generatePortfolioChart(): Promise<Buffer> {
  const width = 400;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const data: ChartData = {
    labels: ['Profile 1', 'Profile 2', 'Profile 3', 'Profile 4'], // Update labels
    datasets: [{
      data: [30, 40, 20, 10], // Update profit values
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }]
  };

  // New table rendering logic
  const tableData = [
    { profile_name: 'Profile 1', profit: 30, sector: 'Stocks', link: 'http://example.com/1' },
    { profile_name: 'Profile 2', profit: 40, sector: 'Bonds', link: 'http://example.com/2' },
    { profile_name: 'Profile 3', profit: 20, sector: 'Real Estate', link: 'http://example.com/3' },
    { profile_name: 'Profile 4', profit: 10, sector: 'Crypto', link: 'http://example.com/4' },
  ];

  // You can now use `tableData` to render a table in your application

  const configuration: ChartConfiguration = {
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

  const tableImage = await chartJSNodeCanvas.renderToBuffer(configuration);

  return Buffer.concat([tableImage, Buffer.from(JSON.stringify(tableData))]);
}
