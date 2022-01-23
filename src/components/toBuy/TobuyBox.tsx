import AddNewToBuyForm from "./AddNewToBuyForm";
import ToBuyCard from "./TobuyCard";
import { useState } from "react";
import { useAppSelector } from "../../hooks/storeHooks";

const SavingBox = () => {
  const [isAddToBuy, setIsAddToBuy] = useState(false);
  const ToBuyList = useAppSelector((state) => state.userData.data.toBuy);

  const openAddTobuy = () => {
    setIsAddToBuy((state) => !state);
  };
  return (
    <div className="w-1/2 bg-white rounded-md border-2 border-blue-400 shadow-xl shadow-slate-400">
      <p className="text-center text-black text-4xl mb-2">To Buy</p>

      {isAddToBuy ? (
        <AddNewToBuyForm openAddTobuy={openAddTobuy} />
      ) : (
        <div className="flex justify-center ">
          <button
            className="mx-auto text-black text-xl bg-slate-200 rounded-md p-2 hover:bg-slate-300 my-3"
            onClick={openAddTobuy}
          >
            Add
          </button>
        </div>
      )}

      <div className="h-96 overflow-auto hideScrollbar snap-y">
        {!!ToBuyList ? (
          ToBuyList.map((x) => <ToBuyCard forName={x.for} key={x.for} />)
        ) : (
          <p className="text-center">Empty</p>
        )}
      </div>
    </div>
  );
};

export default SavingBox;
