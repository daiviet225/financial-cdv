import { useState, useRef, FormEvent, FC } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";
import { Dialog } from "@headlessui/react";
import React from "react";

const AddNewSavingForm: FC<{ openAddTobuy: () => void; isOpen: boolean }> = (
  props
) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameErro, setNameError] = useState(false);

  const dispatch = useAppDispatch();

  const unError = () => {
    setNameError(false);
  };

  const openAddTobuy = () => {
    props.openAddTobuy();
  };

  const addNewTobuy = (event: FormEvent) => {
    event.preventDefault();

    setNameError(false);

    const enterName = nameRef.current!.value;

    if (enterName?.trim() === "") {
      setNameError(true);
      return;
    }

    dispatch(
      userDataStoreAction.addNewToBuy({
        for: enterName,
      })
    );

    props.openAddTobuy();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => openAddTobuy()}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <form
        className="bg-white rounded-md p-2 mx-auto relative mt-36 w-72 border-4 border-purple-500 select-none"
        onSubmit={addNewTobuy}
      >
        <div className="flex items-center">
          <label htmlFor="for" className="text-lg text-center w-2/6">
            To List
          </label>
          <input
            type="text"
            id="for"
            ref={nameRef}
            className={`rounded-md p-1 w-4/6 ${
              nameErro && "bg-red-400"
            } focus:border-purple-400 focus:ring-purple-400`}
            onFocus={unError}
            placeholder={"text"}
          />
        </div>

        <div className="flex gap-5 justify-center mt-2">
          <button
            className="text-white bg-purple-500 rounded-md p-2 hover:bg-purple-400"
            onClick={addNewTobuy}
          >
            Add
          </button>
          <button
            className="text-white bg-red-500 rounded-md p-2 hover:bg-red-400"
            type="button"
            onClick={openAddTobuy}
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default React.memo(AddNewSavingForm);
