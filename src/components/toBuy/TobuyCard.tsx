import { FC, FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";
import { useRef } from "react";

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const ToBuyCard: FC<{ forName: string }> = (props) => {
  let perfectDay: string;
  if (month < 10) {
    perfectDay = `${year}-${"0" + month}-${day}`;
  } else {
    perfectDay = `${year}-${month}-${day}`;
  }

  const [open, setOpen] = useState(false);
  const costRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const removeSpending = () => {
    setOpen((state) => !state);
  };

  const passToSpending = (event: FormEvent) => {
    event.preventDefault();

    const enterCost = +costRef.current!.value;

    dispatch(
      userDataStoreAction.addNewExpense({
        for: props.forName,
        cost: enterCost,
        date: perfectDay,
      })
    );
  };

  return (
    <>
      {open ? (
        <form
          className="bg-blue-400 text-white text-2xl gap-3 rounded-md mx-2 flex p-2 text-md font-medium items-center mb-2 snap-start shadow-xl shadow-slate-400"
          onSubmit={passToSpending}
        >
          <label htmlFor="cost">Cost</label>
          <input
            type="number"
            name="cost"
            id="cost"
            ref={costRef}
            className="rounded-md p-0 w-3/4 text-black px-2"
          />
          <button className="bg-green-400 text-sm p-1 rounded-md">add</button>
          <button
            className="bg-red-500 text-sm p-1 rounded-md"
            onClick={removeSpending}
            type="button"
          >
            cancel
          </button>
        </form>
      ) : (
        <div
          className="bg-blue-400 text-white text-2xl rounded-md mx-2 flex p-2 text-md font-medium items-center justify-center mb-2 hover:bg-blue-600 snap-start shadow-xl shadow-slate-400 "
          onClick={removeSpending}
        >
          <p className="text-center">{props.forName}</p>
        </div>
      )}
    </>
  );
};

export default ToBuyCard;
