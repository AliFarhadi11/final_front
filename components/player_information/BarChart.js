import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Colors } from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    autocolors,
    Colors,
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
        autocolors: {
            enabled: true,
            mode: 'data',

        },
    },
    scales: {
        x: {
            grid: {
                drawOnChartArea: false,

            },
     
        },
        y: {
            grid: {
                drawOnChartArea: false,
            }
        }
    }

};


export default function BarChart({ chart_labels, data_value }) {
    return (
        <Bar options={options} data={{
            labels: chart_labels,
            datasets: [{
                label: 'value ',
                data: data_value,
                borderWidth: 1,
            },
            ]
        }}
        />
    )
}