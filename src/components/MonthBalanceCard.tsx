import { FC } from "react";
import { MonthDataType } from "../type/userDataType";
import { PieChart } from "react-minimal-pie-chart";

const MonthBalance: FC<{ MonthData: MonthDataType; label: string }> = (
  props
) => {
  let percentCashLeft = Math.ceil(
    (props.MonthData.spending / props.MonthData.limit) * 100
  );

  let color = "green";

  if (percentCashLeft.toString() === "NaN") {
    percentCashLeft = 0;
  }
  if (percentCashLeft > 50) {
    color = "yellow";
  }
  if (percentCashLeft > 70) {
    color = "red";
  }

  return (
    <div className=" text-center w-4/12 bg-slate-200 rounded-md py-5 shadow-xl shadow-slate-400">
      <p className="text-black text-xl mb-2 font-medium">
        {props.label} Month Spending
      </p>

      <p className="text-black text-xl mb-2 font-medium">
        ${props.MonthData.spending.toFixed(2)} / $
        {props.MonthData.limit.toFixed(2)}
      </p>
      <div className="w-3/4 m-auto relative">
        <PieChart
          totalValue={props.MonthData.limit}
          startAngle={270}
          radius={40}
          lineWidth={20}
          rounded
          label={() => percentCashLeft + "%"}
          labelPosition={0}
          background={"white"}
          labelStyle={{
            fontSize: "13px",
            fontFamily: "sans-serif",
            fill: `${color}`,
          }}
          animate
          segmentsStyle={{}}
          data={[
            {
              title: "Spending",
              value: props.MonthData.spending,
              color: `${color}`,
              key: "Spending",
            },
          ]}
        ></PieChart>
      </div>
    </div>
  );
};

export default MonthBalance;
