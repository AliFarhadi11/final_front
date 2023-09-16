import {
    Chart as ChartJs,
    LineElement,
    PointElement,
    BarElement,
    Tooltip,
    Legend,
    LinearScale,
    Filler,
    CategoryScale,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJs.register(LineElement, PointElement, Tooltip, Filler, CategoryScale, LinearScale, BarElement);

function createData(data) {

return {
    labels: [
        "Ast",
        "PK",
        "Gls",
        "Sh",
        "Pass",
        "Crs",
        "TKl",
        "Prs",
        "Blk",
        "Int",
        "Clr",
        "Tch",
        "Drd",
        "Cri",
        "Recov",
        "Arl",
        "Fls",
    ],

    datasets: [
        {
            label: [],
            data: data,
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                //Gradient1
                const gradient1 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient1.addColorStop(0, "#273DF3");
                gradient1.addColorStop(1, "rgba(39, 61, 243, 0.14)");

                //Gradient2
                const gradient2 = ctx.createLinearGradient(0, 0, 0, 1000);

                gradient2.addColorStop(0, "#278AF3");
                gradient2.addColorStop(1, "rgba(39, 138, 243, 0.15)");

                //Gradient3
                const gradient3 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient3.addColorStop(0, "#F32757");
                gradient3.addColorStop(1, "rgba(243, 39, 87, 0.05)");

                //Gradient4
                const gradient4 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient4.addColorStop(0, "#F39027");
                gradient4.addColorStop(1, "rgba(243, 144, 39, 0.15)");

                //Gradient5
                const gradient5 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient5.addColorStop(0, "#27D7F3");
                gradient5.addColorStop(1, "rgba(39, 215, 243, 0.15)");

                //Gradient6
                const gradient6 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient6.addColorStop(0, "#F327F0");
                gradient6.addColorStop(1, "rgba(243, 39, 240, 0.15)");

                //Gradient7
                const gradient7 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient7.addColorStop(0, "#27F3C3");
                gradient7.addColorStop(1, "rgba(39, 243, 195, 0.15)");

                //Gradient8
                const gradient8 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient8.addColorStop(0, "#F3DC27");
                gradient8.addColorStop(1, "rgba(243, 220, 39, 0.15)");

                //Gradient9
                const gradient9 = ctx.createLinearGradient(0, 0, 0, 500);

                gradient9.addColorStop(0, "#AB8DFE");
                gradient9.addColorStop(1, "rgba(171, 141, 254, 0.15)");

                return [
                    gradient1,
                    gradient2,
                    gradient3,
                    gradient4,
                    gradient5,
                    gradient6,
                    gradient7,
                    gradient8,
                    gradient9,
                ];
            },
            borderRadius: 8,
        },
    ],
}
}

const tooltipContents = [
    "Assists",
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
    "test13",
    "test14",
    "test15",
    "Test16",
    "test17",
];

const options = {

    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
        },
    },

    plugins: {
        tooltip: {
            callbacks: {
                beforeTitle: function (context) {
                    return `${tooltipContents[context[0].dataIndex]}`;
                },
            },
        },
        legend: {
            display: false
           }
        
    },
};
const PlayerPerformanceChart = ({barChartData}) => {
    return <Bar data={createData(barChartData)} options={options}></Bar>;
};

export default PlayerPerformanceChart;
