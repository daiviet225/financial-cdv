import { useState } from "react";
import AddNewExpenseFrom from "./AddNewExpenseFrom";
import ExpenseCard from "./ExpenseCard";
import { useAppSelector } from "../../hooks/storeHooks";

const ExpenseBox = () => {
  const [isAddNewExpense, setIsAddNewExpense] = useState(false);
  const expense = useAppSelector((state) => state.userData.data.expense);

  const openAddExpense = () => {
    setIsAddNewExpense((state) => !state);
  };

  return (
    <div className="w-1/2 bg-white rounded-md border-2 border-blue-400 shadow-xl shadow-slate-400">
      <p className="text-center text-black text-4xl mb-2"> Spending </p>
      {isAddNewExpense ? (
        <AddNewExpenseFrom openAddExpense={openAddExpense} />
      ) : (
        <div className="flex justify-center ">
          <button
            className="mx-auto text-black text-xl bg-slate-200 rounded-md p-2 hover:bg-slate-300 my-3"
            onClick={openAddExpense}
          >
            Add
          </button>
        </div>
      )}

      <div className="h-3/4 overflow-auto hideScrollbar snap-y p-2">
        {!!expense ? (
          expense.map((x, index) => (
            <ExpenseCard
              forName={x.for}
              cost={x.cost}
              date={x.date}
              index={index}
              key={x.for + x.cost + x.date + index}
            />
          ))
        ) : (
          <p className="text-center">Empty</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseBox;
