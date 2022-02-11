import { useAppSelector } from "../../hooks/storeHooks";
import AnimatedNumbers from "react-animated-numbers";
import React from "react";

const IncomeNum = () => {
  const income = useAppSelector((state) => state.userData.data.income);
  let overMB = income;

  const sign = Math.sign(Number(income));

  if (income > 999999 && income < 1000000000) {
    overMB = sign * (Math.abs(Number(income)) / 1000000);
  }

  if (income > 999999999) {
    overMB = sign * (Math.abs(Number(income)) / 1000000000);
  }

  return (
    <div>
      <p className="text-emerald-300 text-2xl font-medium">Income</p>
      <div className="text-emerald-300 text-2xl font-medium flex justify-center">
        $
        {income < 1000000 ? (
          <AnimatedNumbers
            configs={[
              { mass: 1, tension: 130, friction: 40 },
              { mass: 2, tension: 140, friction: 40 },
              { mass: 3, tension: 130, friction: 40 },
            ]}
            animateToNumber={income}
          />
        ) : income < 1000000000 ? (
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

export default React.memo(IncomeNum);
