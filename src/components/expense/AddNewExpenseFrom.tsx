import { ChangeEvent, FC, FormEvent, useState } from "react";
import React from "react";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";
import { Dialog } from "@headlessui/react";

const AddNewExpenseFrom: FC<{ openAddExpense: () => void; isOpen: boolean }> = (
  props
) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const defaultValue = today.toLocaleDateString("en-CA");

  const [date, setDate] = useState(defaultValue);
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
    <Dialog
      open={props.isOpen}
      onClose={() => openAddExpense()}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <form
        className="bg-white rounded-md p-2 mx-auto relative w-1/4 mt-36 flex gap-1 flex-col border-4 border-emerald-500 select-none"
        onSubmit={addNewExpense}
      >
        <div className="flex justify-between items-center ">
          <label htmlFor="for" className="w-1/4 text-center text-lg">
            For
          </label>
          <input
            type="text"
            id="for"
            ref={nameRef}
            className={`rounded-md p-1 w-3/4 ${
              nameErro && "bg-red-300"
            } focus:border-emerald-400 focus:ring-emerald-400`}
            onFocus={unError}
            placeholder="Spending"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="cost" className="w-1/4 text-center text-lg">
            Cost
          </label>
          <input
            type="number"
            id="cost"
            ref={costRef}
            className={`rounded-md p-1 w-3/4 ${
              costErro && "bg-red-300"
            } focus:border-emerald-400 focus:ring-emerald-400`}
            onFocus={unError}
            placeholder="0.00"
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="date" className="w-1/4 text-center text-lg">
            Date
          </label>
          <input
            type="date"
            id="date"
            defaultValue={defaultValue}
            className={`rounded-md p-1 w-3/4 ${
              dateError && "bg-red-300"
            } focus:border-emerald-400 focus:ring-emerald-400`}
            onFocus={unError}
            onChange={dateChangeHandler}
          />
        </div>
        {dateError && <p className="text-center">incorrect date</p>}

        <div className="flex gap-5 justify-center mt-2">
          <button
            className="text-white bg-emerald-500 rounded-md p-2 hover:bg-emerald-400 select-none"
            onClick={addNewExpense}
          >
            Add
          </button>
          <button
            className="text-white bg-red-500 rounded-md p-2 hover:bg-red-400 select-none"
            type="button"
            onClick={openAddExpense}
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default React.memo(AddNewExpenseFrom);
