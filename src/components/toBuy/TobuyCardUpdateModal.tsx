import { FC, useRef, FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";
import React from "react";

const TobuyCardUpdateModal: FC<{
  isOpen: boolean;
  openCloseModal: () => void;
  forName: string;
  index: number;
}> = (props) => {
  const costRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const today = new Date();
  const defaultValue = today.toLocaleDateString("en-CA");

  const passToSpending = (event: FormEvent) => {
    event.preventDefault();

    const enterCost = +costRef.current!.value;

    dispatch(
      userDataStoreAction.addNewExpense({
        for: props.forName,
        cost: enterCost,
        date: defaultValue,
      })
    );
    dispatch(userDataStoreAction.removeToBuy(props.index));
  };
  const removeToBuy = () => {
    dispatch(userDataStoreAction.removeToBuy(props.index));
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.openCloseModal()}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <form
        className="bg-white rounded-md p-2 mx-auto relative mt-36 w-1/3 border-4 border-purple-500 flex flex-col gap-2"
        onSubmit={passToSpending}
      >
        <p className="text-2xl font-medium text-center break-words mx-5 text-purple-500">
          {props.forName}
        </p>
        <div className="mx-auto w-1/2 flex gap-2 items-center">
          <label htmlFor="for" className="text-lg">
            Cost
          </label>
          <input
            type="number"
            id="for"
            placeholder={"number"}
            ref={costRef}
            className="w-3/4 rounded-md p-1 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex gap-5 justify-center select-none">
          <button
            className="text-white bg-purple-500 rounded-md p-2 hover:bg-purple-400"
            onClick={passToSpending}
          >
            Add
          </button>

          <button
            className="text-white bg-red-500 rounded-md p-2 hover:bg-red-400"
            type="button"
            onClick={removeToBuy}
          >
            Remove
          </button>
          <button
            className="text-white bg-blue-500 rounded-md p-2 hover:bg-blue-400"
            type="button"
            onClick={props.openCloseModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default React.memo(TobuyCardUpdateModal);
