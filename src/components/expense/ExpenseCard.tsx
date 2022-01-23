import { FC } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";

const ExpenseCard: FC<{
  forName: string;
  cost: number;
  date: string;
  index: number;
}> = (props) => {
  const time = props.date.split("-");
  const dispatch = useAppDispatch();

  const removeSpending = () => {
    dispatch(
      userDataStoreAction.removeExpense({
        cost: props.cost,
        index: props.index,
      })
    );
  };

  return (
    <>
      <div
        className="bg-blue-400 text-white rounded-md mx-2 mb-2 p-2 flex text-lg font-medium items-center justify-between  relative hover:bg-blue-600 snap-start shadow-xl shadow-slate-400"
        onClick={removeSpending}
      >
        <div>
          <p className="text-center">{props.forName}</p>
          <p className="text-base">{`${time[2]} / ${time[1]} / ${time[0]}`}</p>
        </div>

        <p> ${props.cost}</p>
      </div>
    </>
  );
};

export default ExpenseCard;
