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

export default function CustomerRatings() {

    const labels = ['April', 'May', 'June', 'July'];

    const options = {
        responsive: true,
        maintainAspectRatio: false, // allows height to adjust
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Customer Ratings',
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Approval',
                data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Complaints',
                data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Bar options= { options } data = { data } > </Bar>
    )
}