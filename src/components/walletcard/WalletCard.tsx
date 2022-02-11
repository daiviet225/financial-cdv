import BalanceNum from "./BalanceNum";
import IncomeNum from "./IncomeNum";
import React from "react";

const WalletCard = () => {
  return (
    <>
      <div className="flex flex-col justify-evenly items-center text-center w-4/12 bg-white rounded-md text-yellow-400 border-4 border-yellow-400 select-none">
        <BalanceNum />
        <IncomeNum />
      </div>
    </>
  );
};

export default React.memo(WalletCard);
