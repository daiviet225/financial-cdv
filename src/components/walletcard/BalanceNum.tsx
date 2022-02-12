import { useAppSelector } from "../../hooks/storeHooks";
import AnimatedNumbers from "react-animated-numbers";
import React from "react";

const BalanceNum = () => {
  const balance = useAppSelector((state) => state.userData.data.balance);

  let overMB = balance;

  const sign = Math.sign(Number(balance));

  if (balance > 999999 && balance < 1000000000) {
    overMB = sign * (Math.abs(Number(balance)) / 1000000);
  }

  if (balance > 999999999) {
    overMB = sign * (Math.abs(Number(balance)) / 1000000000);
  }

  return (
    <div>
      <p className="text-3xl font-medium">Balance</p>
      <div className="text-3xl font-medium gap-1 flex justify-center">
        $
        {balance < 1000000 ? (
          <AnimatedNumbers
            configs={[
              { mass: 1, tension: 130, friction: 40 },
              { mass: 2, tension: 140, friction: 40 },
              { mass: 3, tension: 130, friction: 40 },
            ]}
            animateToNumber={balance}
          />
        ) : balance < 1000000000 ? (
          <>
            <AnimatedNumbers animateToNumber={+overMB.toFixed(2)} />M
          </>
        ) : (
          <>
            <AnimatedNumbers animateToNumber={+overMB.toFixed(2)} />B
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(BalanceNum);
