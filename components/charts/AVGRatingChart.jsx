import {
    Chart as ChartJs,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    LinearScale,
    Filler,
    CategoryScale,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJs.register(LineElement, PointElement, Tooltip, Filler, CategoryScale, LinearScale);
function createData(data) {

return  {
    labels: data.labels,

    datasets: [
        {
            label: "",
            data: data.data,
            fill: true,
            backgroundColor: "rgba(22,74,163, 0.3)",
            borderColor: "rgb(22,74,163)",
        },
    ],
} 
}
const options = {
    // scales: {
    //     x: {
    //         grid: {
    //             display: false,
    //         },
    //     },
    //     y: {
    //         grid: {
    //             display: false,
    //         },
    //     },
    // },

    responsive: true,
    tension : 0.3,

    plugins: {
        tooltip: {
            callback: {
                beforeTitle: function (context) {
                    return "Thisis title";
                },
            },
        },
        legend: {
            display: false
           }

    },
};
const AVGRatingChart = ({ratingsData}) => {
    return <Line data={createData(ratingsData)} options={options}></Line>;
};

export default AVGRatingChart;
