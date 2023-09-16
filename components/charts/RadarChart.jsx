import {
    Chart as ChartJs,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler,
} from "chart.js";
import { isEmpty } from "lodash";

import { Radar } from "react-chartjs-2";

ChartJs.register(LineElement, PointElement, Tooltip, RadialLinearScale, Filler);

function createData(data) {
    return (
        {
            labels: ["DEF", "CRE", "TAC", "xG", "ATT"],
            datasets: [
                {
                    label: "",
                    data: data,
                    fill: true,
                    backgroundColor: "rgba(2, 99, 255, 0.16)",
                    borderColor: "rgba(2, 99, 255, 0.3)",
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#A10000",
                },
            ],
        }
    )
}

const RadarChart = ({ radar_data, }) => {
    const options = {
        elements: {
            line: {
                borderWidth: 2,
            },
        },

        responsive: true,
    };

    return <Radar options={options} data={createData(radar_data)} ></Radar>
}


export default RadarChart