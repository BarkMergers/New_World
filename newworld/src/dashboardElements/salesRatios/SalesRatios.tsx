import { faker } from '@faker-js/faker';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function SalesRatios() {
    const labels = ['Team A', 'Team B', 'Team C', 'Team D'];

    const options = {
        responsive: true,
        indexAxis: 'y' as const,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sates Ratios',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Team',
                data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <Bar options={options} data={data} > </Bar>
    )
}