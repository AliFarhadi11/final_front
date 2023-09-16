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

return  {
    labels: data.labels,

    datasets: [
        {
            label: "",
            data: data.data,
            fill: true,
            backgroundColor: [
                "#273DF3", "#F32757", "#F39027","#1FBB96", "#F327F0", "#F39027",
                "#273DF3", "#F32757", "#F39027","#1FBB96", "#F327F0", "#F39027",
                "#273DF3", "#F32757", "#F39027","#1FBB96", "#F327F0", "#F39027",
                "#273DF3", "#F32757", "#F39027","#1FBB96", "#F327F0", "#F39027",
                "#273DF3", "#F32757", "#F39027","#1FBB96", "#F327F0", "#F39027",
                "#273DF3", "#F32757", "#F39027","#1FBB96", "#F327F0", "#F39027",
        ],
            borderRadius: 5,
        },
    ],
} 
}
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

    responsive: true,

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
    return <Bar data={createData(ratingsData)} options={options}></Bar>;
};

export default AVGRatingChart;
