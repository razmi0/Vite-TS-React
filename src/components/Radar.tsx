//#region Imports
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
import type {
  ChartData,
  ChartOptions,
  GridLineOptions,
  TickOptions,
  PointPrefixedOptions,
  PointPrefixedHoverOptions,
  PointOptions,
  TooltipOptions,
  RadialLinearScaleOptions,
} from "chart.js";
import { DataType, HasNumber } from "../types";
import { calcPerf } from "../utils";

//#endregion Imports
//#region Variables
ChartJS.register(
  Filler,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

const color = "rgba(83, 23, 120, 0.8)";
const name = "Charizard",
  hp = 78,
  att = 84,
  def = 78,
  spA = 109,
  spD = 85,
  spe = 100;

//#endregion Variables

interface RadarChartProp {
  data: DataType[];
}
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};
type Tuple6<TItem> = Tuple<TItem, 6>;
type Tuple7<TItem> = Tuple<TItem | string, 7>;

function RadarChart({ data }: RadarChartProp) {
  // const [...clodata] = raw;
  // const data = clodata.splice(0, 50);
  const t1 = performance.now();

  //#region DataTemplate

  const dataRadar: ChartData<"radar"> = {
    labels: ["HP", "Attack", "Defense", "Sp.Attack", "Sp.Defense", "HP"],
    datasets: data.map((item, i) => {
      let c = colors(data.length);
      return {
        label: `${item.name}`,
        data: [
          item.HP,
          item.Attack,
          item.Defense,
          item.SpAttack,
          item.SpDefense,
          item.Speed,
        ] as Tuple6<number>,
        backgroundColor: c[i],
        tension: 0.1,
        fill: {
          target: "origin",
          below: c[i],
        },
      };
    }) as ChartData<"radar">["datasets"],
  };
  const options = {
    interaction: {
      mode: "nearest",
      // intersect: false,
      // includeInvisibleLines: false,
    },
    responsive: true,
    animations: {
      radius: {
        duration: 100,
        easing: "linear",
      },
    } as ChartOptions<"radar">["animations"],

    scales: {
      r: {
        grid: {
          circular: true,
          color: "#ffffff",
        } as GridLineOptions,
        ticks: {
          display: false,
        } as TickOptions,
        pointLabels: {
          color: "#ffffff",
        },
        beginAtZero: true,
      } as RadialLinearScaleOptions,
    },
    plugins: {
      legend: {
        hidden: true,
        display: false,
      },
      tooltip: {
        mode: "index",
        filter: (item) => {
          return item.datasetIndex < 10 ? true : false;
        },
        itemSort: (a: any, b: any) => {
          return b.raw - a.raw;
        },
        opacity: 0.7,
      },
    },
    elements: {
      point: {
        radius: 1,
      } as PointOptions & PointPrefixedOptions & PointPrefixedHoverOptions,
      line: {
        borderWidth: 1.2,
      },
    },
  } as ChartOptions<"radar">;

  //#endregion DataTemplate

  return (
    <>
      <Radar data={dataRadar} options={options} />
      {calcPerf(t1, "RadarChart")}
    </>
  );
}

function colors(length: number): string[] {
  let arr = Array();
  let r, g, b, a;
  for (let i = 0; i < length; i++) {
    (r = Math.floor(Math.random() * 255)),
      (g = Math.floor(Math.random() * 255)),
      (b = Math.floor(Math.random() * 255)),
      (a = 0.8);
    arr.push(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return arr;
}

export default RadarChart;
