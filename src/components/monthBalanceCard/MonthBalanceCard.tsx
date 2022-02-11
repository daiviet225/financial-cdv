import { FC } from "react";
import React from "react";
import { MonthDataType } from "../../type/userDataType";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LimitNum from "./LimitNum";
import SpedingNum from "./SpendingNum";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthBalance: FC<{ MonthData: MonthDataType; label: string }> = (
  props
) => {
  let percentCashLeft = Math.ceil(
    (props.MonthData.spending / props.MonthData.limit) * 100
  );

  let leftLimit = props.MonthData.limit - props.MonthData.spending;
  if (leftLimit < 0) {
    leftLimit = 0;
  }

  let color = "rgba(60, 179, 113,1)";
  let textcolor = "text-green-500";
  let borderColor = "border-green-500";

  if (percentCashLeft > 50) {
    color = "rgba(255, 220, 90, 1)";
    textcolor = "text-yellow-500";
    borderColor = "border-yellow-500";
  }
  if (percentCashLeft > 70) {
    color = "rgba(245, 39, 39, 1)";
    textcolor = "text-red-500";
    borderColor = "border-red-500";
  }

  const data = {
    labels: ["Spending", "Limit Left"],
    datasets: [
      {
        data: [props.MonthData.spending, leftLimit],
        backgroundColor: [color, "rgba(250, 250, 250, 1)"],
        borderColor: ["rgba(100, 100, 100, 0.5)"],
        borderWidth: 0,
      },
    ],
    colors: ["white"],
  };

  const option = {
    elements: { point: { pointStyle: "circle" } },
    plugins: {
      legend: {
        display: false,
        labels: { font: { size: 17, color: "white" } },
      },
    },
  };

  return (
    <div
      className={`text-center w-4/12 bg-white border-4 ${borderColor} rounded-md py-5 select-none flex flex-col gap-2`}
    >
      <p className={`text-xl font-medium ${textcolor}`}>{props.label} Month</p>
      <div className="text-xl font-medium flex justify-center gap-1">
        <div className={`${textcolor} flex`}>
          $<SpedingNum spending={props.MonthData.spending} />
        </div>
        <p>/</p>
        <LimitNum limit={props.MonthData.limit} />
      </div>
      <Doughnut data={data} options={option} className="m-5"></Doughnut>
    </div>
  );
};

export default React.memo(MonthBalance);
