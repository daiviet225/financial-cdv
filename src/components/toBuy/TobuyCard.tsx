import { FC, useState } from "react";
import TobuyCardUpdateModal from "./TobuyCardUpdateModal";
import React from "react";

const ToBuyCard: FC<{ forName: string; index: number }> = (props) => {
  const [open, setOpen] = useState(false);

  const openCloseModal = () => {
    setOpen((state) => !state);
  };

  return (
    <>
      <TobuyCardUpdateModal
        openCloseModal={openCloseModal}
        isOpen={open}
        forName={props.forName}
        index={props.index}
      />
      <div
        className="bg-purple-400 text-white text-2xl rounded-md mx-2 mb-2 flex p-2 text-md font-medium items-center justify-center mb-2 hover:bg-purple-600 cursor-pointer"
        onClick={openCloseModal}
      >
        <p className="text-center overflow-hidden text-ellipsis">
          {props.forName}
        </p>
      </div>
    </>
  );
};

export default React.memo(ToBuyCard);
