import { FC } from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";
import React from "react";

const ExpenseCardUpdateModal: FC<{
  isOpen: boolean;
  openCloseModal: () => void;
  index: number;
  forName: string;
  cost: number;
  date: string;
}> = (props) => {
  const { isOpen, index, forName, cost, date } = props;
  const dispatch = useAppDispatch();
  const time = date.split("-");

  const removeSpending = () => {
    dispatch(
      userDataStoreAction.removeExpense({
        cost: cost,
        index: index,
      })
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => props.openCloseModal()}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="bg-white rounded-md p-2 mx-auto relative mt-36 w-1/3 border-4 border-emerald-500 flex flex-col gap-2 text-center font-medium">
        <p className="text-xl">{`${time[2]} / ${time[1]} / ${time[0]}`}</p>
        <p className="text-2xl font-medium break-words mx-5">{forName}</p>
        <p className="text-2xl font-medium">${cost}</p>
        <div className="flex gap-5 justify-center select-none">
          <button
            className="text-white bg-emerald-500 rounded-md p-2 hover:bg-emerald-400"
            type="button"
            onClick={props.openCloseModal}
          >
            close
          </button>
          <button
            className="text-white bg-red-500 rounded-md p-2 hover:bg-red-400"
            type="button"
            onClick={removeSpending}
          >
            Remove
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default React.memo(ExpenseCardUpdateModal);
