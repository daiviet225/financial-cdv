import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";

//fuckin date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const AddNewExpenseFrom: FC<{ openAddExpense: () => void }> = (props) => {
  //date
  let perfectDay: string;
  if (month < 10) {
    perfectDay = `${year}-${"0" + month}-${day}`;
  } else {
    perfectDay = `${year}-${month}-${day}`;
  }

  const [date, setDate] = useState(perfectDay);
  const nameRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const [nameErro, setNameError] = useState(false);
  const [costErro, setCostError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const dispatch = useAppDispatch();

  const unError = () => {
    setNameError(false);
    setCostError(false);
    setDateError(false);
  };

  const openAddExpense = () => {
    props.openAddExpense();
  };

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const addNewExpense = (event: FormEvent) => {
    event.preventDefault();

    setNameError(false);
    setCostError(false);
    setDateError(false);

    const enterName = nameRef.current!.value;
    const enterCost = +costRef.current!.value;
    const enterDate = date;
    const dateSplit = enterDate.split("-");

    if (
      +dateSplit[1] !== month ||
      +dateSplit[0] !== year ||
      +dateSplit[2] > day
    ) {
      setDateError(true);
      return;
    }

    if (enterName?.trim() === "") {
      setNameError(true);
      return;
    }

    if (enterCost < 1) {
      setCostError(true);
      return;
    }

    dispatch(
      userDataStoreAction.addNewExpense({
        for: enterName,
        cost: enterCost,
        date: enterDate,
      })
    );

    props.openAddExpense();
  };

  return (
    <form className="bg-blue-200 rounded-md p-2 mx-10" onSubmit={addNewExpense}>
      <div className="flex justify-between items-center">
        <label htmlFor="for">FOR</label>
        <input
          type="text"
          id="for"
          ref={nameRef}
          className={`rounded-md p-1 ${nameErro && "bg-red-300"}`}
          onFocus={unError}
          placeholder="Spending"
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="cost">COST</label>
        <input
          type="number"
          id="cost"
          ref={costRef}
          className={`rounded-md p-1 ${costErro && "bg-red-300"}`}
          onFocus={unError}
          placeholder="0.00"
        />
      </div>

      <div className="flex justify-between items-center">
        <label htmlFor="date">DATE</label>
        <input
          type="date"
          id="date"
          defaultValue={perfectDay}
          className={`rounded-md p-1 ${dateError && "bg-red-300"}`}
          onFocus={unError}
          onChange={dateChangeHandler}
        />
      </div>
      {dateError && <p className="text-center">incorrect date</p>}

      <div className="flex gap-5 justify-center mt-2">
        <button
          className="text-black text-xl bg-slate-200 rounded-md p-2 hover:bg-slate-300"
          onClick={addNewExpense}
        >
          Add
        </button>
        <button
          className="text-black text-xl bg-slate-200 rounded-md p-2 hover:bg-slate-300"
          type="button"
          onClick={openAddExpense}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddNewExpenseFrom;
