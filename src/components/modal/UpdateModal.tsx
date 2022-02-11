import { Dialog } from "@headlessui/react";
import { FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import useInputWithInitialValue from "../../hooks/userInputWithInitialValue";
import { userDataStoreAction } from "../../store/userDataStore";
import React from "react";

const UpdateModal: FC<{ isOpen: boolean; changeOpenState: () => void }> = (
  props
) => {
  const userData = useAppSelector((state) => state.userData.data);
  const dispatch = useAppDispatch();

  const {
    value: income,
    valueChangeHandler: incomeChangeHandler,
    inputBlurHandler: incomeBlurHandler,
  } = useInputWithInitialValue((value) => value > 0, userData.income);

  const {
    value: balance,
    valueChangeHandler: balanceChangeHandler,
    inputBlurHandler: balanceBlurHandler,
  } = useInputWithInitialValue((value) => value > 0, userData.balance);

  const {
    value: limit,
    hasError: limithasError,
    valueChangeHandler: limitChangeHandler,
    inputBlurHandler: limitBlurHandler,
  } = useInputWithInitialValue((value) => value > 0, userData.thisMonth.limit);

  const changeOpenState = () => {
    props.changeOpenState();
  };

  const updateBalanceIncomeLimit = (event: FormEvent) => {
    event.preventDefault();
    if (!limithasError) {
      dispatch(userDataStoreAction.updateLimit(+limit));
      dispatch(userDataStoreAction.updateIncome(+income));
      dispatch(userDataStoreAction.updateBalance(+balance));
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={changeOpenState}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="bg-white w-1/4 m-auto relative p-3 rounded-xl mt-36 flex flex-col gap-2 border-4 border-green-500 select-none">
        <form
          onSubmit={updateBalanceIncomeLimit}
          className="flex flex-col gap-2"
        >
          <div className="flex justify-between">
            <label htmlFor="income">Income</label>
            <input
              type="number"
              name="income"
              id="income"
              value={income}
              onBlur={incomeBlurHandler}
              onChange={incomeChangeHandler}
              className="w-3/4 rounded-md p-1 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="balance">Balance</label>
            <input
              type="number"
              name="balance"
              id="balance"
              value={balance}
              onBlur={balanceBlurHandler}
              onChange={balanceChangeHandler}
              className="w-3/4 rounded-md p-1 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="limit">Limit</label>
            <input
              type="number"
              id="limit"
              name="limit"
              value={limit}
              onBlur={limitBlurHandler}
              onChange={limitChangeHandler}
              className="w-3/4 rounded-md p-1 focus:border-green-500 focus:ring-green-500"
            />
          </div>{" "}
          {limithasError && (
            <p className="text-red-400 text-center">
              please enter number bigger than 0
            </p>
          )}
          <div className="flex justify-center gap-4 items-center">
            <button
              onClick={updateBalanceIncomeLimit}
              className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white"
            >
              update
            </button>
            <button
              className="text-white bg-red-500 rounded-md p-2 hover:bg-red-400"
              onClick={changeOpenState}
              type="button"
            >
              close
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default React.memo(UpdateModal);
