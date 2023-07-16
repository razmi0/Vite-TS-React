import { Container } from "../ui";
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

ChartJS.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale);
function RadarChart() {
  const dataRadar: ChartData<"radar"> = {
    labels: ["HP", "Sp. Defense", "Speed"],
    datasets: [
      {
        label: "",
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: "#535bf2",
        tension: 0.1,
      },
    ],
  };
  const options = {
    backgroundColor: "red",
  };
  return (
    <>
      <Heading as={"h6"} text="Radar" />
      <Container mode="neutral" sx={{}}>
        <Radar data={dataRadar} options={options} />
      </Container>
    </>
  );
}

export default RadarChart;
