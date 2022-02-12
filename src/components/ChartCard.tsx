import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppSelector } from "../hooks/storeHooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartCard = () => {
  const today = new Date();
  const month = today.getMonth();
  const monthByName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let ChartLabels;

  if (month === 0) {
    ChartLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  }
  if (month === 1) {
    ChartLabels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  } else {
    ChartLabels = monthByName.slice(month - 2, month + 2);
  }

  const userDataSpending = useAppSelector(
    (state) => state.userData.data.chartData
  );

  const data = {
    labels: ChartLabels,
    datasets: [
      {
        label: "spending",
        data: userDataSpending,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(100,100,255,1)",
      },
    ],
  };

  return <Line data={data} />;
};

export default ChartCard;
