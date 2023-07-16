import { Container, Section, VStack } from "../ui";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Heading } from "../ui";

ChartJS.register(
  Filler,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

function RadarChart() {
  const dataRadar: ChartData<"radar"> = {
    labels: ["HP", "Sp. Defense", "Speed"],
    datasets: [
      {
        label: "",
        data: [65, 59, 55],
        backgroundColor: "#535bf2",
        tension: 0,
        fill: true,
        borderColor: "#fff",
      },
    ],
  };
  const options = {
    backgroundColor: "red",
    elements: {
      filler: {
        opacity: 0.5,
      },
      line: {
        borderWidth: 1.2,
      },
    },
  };
  return <Radar data={dataRadar} options={options} />;
}

export default RadarChart;
