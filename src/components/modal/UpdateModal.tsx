import { Dialog } from "@headlessui/react";
import { FC, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import useInputWithInitialValue from "../../hooks/userInputWithInitialValue";
import { userDataStoreAction } from "../../store/userDataStore";

const UpdateModal: FC<{ isOpen: boolean; changeOpenState: () => void }> = (
  props
) => {
  const userData = useAppSelector((state) => state.userData.data);
  const dispatch = useAppDispatch();

  const {
    value: income,
    hasError: incomehasError,
    valueChangeHandler: incomeChangeHandler,
    inputBlurHandler: incomeBlurHandler,
    reset: incomeReset,
  } = useInputWithInitialValue((value) => value > 0, userData.income);

  const {
    value: balance,
    hasError: balancehasError,
    valueChangeHandler: balanceChangeHandler,
    inputBlurHandler: balanceBlurHandler,
    reset: balanceReset,
  } = useInputWithInitialValue((value) => value > 0, userData.balance);

  const {
    value: limit,
    hasError: limithasError,
    valueChangeHandler: limitChangeHandler,
    inputBlurHandler: limitBlurHandler,
    reset: limitReset,
  } = useInputWithInitialValue((value) => value > 0, userData.thisMonth.limit);

  const changeOpenState = () => {
    props.changeOpenState();
  };

  const updateIncome = (event: FormEvent) => {
    event.preventDefault();
    dispatch(userDataStoreAction.updateIncome(+income));
  };

  const updateBalance = (event: FormEvent) => {
    event.preventDefault();
    dispatch(userDataStoreAction.updateBalance(+balance));
  };

  const updateLimit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(userDataStoreAction.updateLimit(+limit));
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={changeOpenState}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="bg-white w-1/4 m-auto transform p-3 rounded-xl mt-32 flex flex-col gap-2">
        <form onSubmit={updateIncome} className="flex justify-between">
          <label htmlFor="income">Income</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="income"
              id="income"
              value={income}
              onBlur={incomeBlurHandler}
              onChange={incomeChangeHandler}
              className="w-3/4 rounded-md p-1"
            />
            <button
              onClick={updateIncome}
              className="bg-blue-500 hover:bg-blue-600 p-1 rounded-md text-white"
            >
              update
            </button>
          </div>
        </form>
        <form onSubmit={updateBalance} className="flex justify-between">
          <label htmlFor="balance">Balance</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="balance"
              id="balance"
              value={balance}
              onBlur={balanceBlurHandler}
              onChange={balanceChangeHandler}
              className="w-3/4 rounded-md p-1"
            />
            <button
              onClick={updateBalance}
              className="bg-blue-500 hover:bg-blue-600 p-1 rounded-md text-white"
            >
              update
            </button>
          </div>
        </form>
        <form onSubmit={updateLimit} className="flex justify-between">
          <label htmlFor="limit">Limit</label>
          <div className="flex gap-2">
            <input
              type="number"
              id="limit"
              name="limit"
              value={limit}
              onBlur={limitBlurHandler}
              onChange={limitChangeHandler}
              className="w-3/4 rounded-md p-1"
            />
            <button
              onClick={updateLimit}
              className="bg-blue-500 hover:bg-blue-600 p-1 rounded-md text-white"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default UpdateModal;
