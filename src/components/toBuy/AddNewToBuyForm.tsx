import { useState, useRef, FormEvent, FC } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { userDataStoreAction } from "../../store/userDataStore";

const AddNewSavingForm: FC<{ openAddTobuy: () => void }> = (props) => {
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
    <form className="bg-blue-200 rounded-md p-2 mx-10" onSubmit={addNewTobuy}>
      <div className="flex justify-between items-center">
        <label htmlFor="for">FOR</label>
        <input
          type="text"
          id="for"
          ref={nameRef}
          className={`rounded-md p-1 ${nameErro && "bg-red-300"}`}
          onFocus={unError}
        />
      </div>

      <div className="flex gap-5 justify-center mt-2">
        <button
          className="text-black text-xl bg-slate-200 rounded-md p-2 hover:bg-slate-300"
          onClick={addNewTobuy}
        >
          Add
        </button>
        <button
          className="text-black text-xl bg-slate-200 rounded-md p-2 hover:bg-slate-300"
          type="button"
          onClick={openAddTobuy}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddNewSavingForm;
