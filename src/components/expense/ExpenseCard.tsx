import { FC, useState } from "react";
import ExpenseCardUpdateModal from "./ExpenseCardUpdateModal";
import React from "react";

const ExpenseCard: FC<{
  forName: string;
  cost: number;
  date: string;
  index: number;
}> = (props) => {
  const { forName, cost, date, index } = props;
  const time = date.split("-");

  const [open, setOpen] = useState(false);

  const openCloseModal = () => {
    setOpen((state) => !state);
  };

  let overMB: string | number = cost;

  const sign = Math.sign(Number(cost));

  if (cost > 999999 && cost < 1000000000) {
    overMB = (sign * (Math.abs(Number(cost)) / 1000000)).toFixed(2) + "M";
  }

  if (cost > 999999999) {
    overMB = (sign * (Math.abs(Number(cost)) / 1000000000)).toFixed(2) + "B";
  }

  return (
    <>
      <ExpenseCardUpdateModal
        isOpen={open}
        openCloseModal={openCloseModal}
        index={index}
        forName={forName}
        cost={cost}
        date={date}
      />
      <div
        className="bg-emerald-400 text-white rounded-md p-2 flex text-lg font-medium items-center justify-between relative hover:bg-emerald-500 cursor-pointer"
        onClick={openCloseModal}
      >
        <div className="w-3/4">
          <p className="truncate">{forName}</p>
          <p className="text-base">{`${time[2]} / ${time[1]} / ${time[0]}`}</p>
        </div>

        <p className="w-1/4 text-right"> ${overMB}</p>
      </div>
    </>
  );
};

export default React.memo(ExpenseCard);
