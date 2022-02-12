import { useAppSelector } from "../../hooks/storeHooks";
import AnimatedNumbers from "react-animated-numbers";
import React from "react";

const IncomeNum = () => {
  const income = useAppSelector((state) => state.userData.data.income);
  let overMB = income;

  const sign = Math.sign(Number(income));

  if (Math.abs(income) > 999999 && Math.abs(income) < 1000000000) {
    overMB = sign * (Math.abs(Number(income)) / 1000000);
  }

  if (Math.abs(income) > 999999999) {
    overMB = sign * (Math.abs(Number(income)) / 1000000000);
  }

  return (
    <div>
      <p className="text-emerald-300 text-2xl font-medium">Income</p>
      <div className="text-emerald-300 text-2xl font-medium flex justify-center">
        $
        {Math.abs(income) < 1000000 ? (
          <AnimatedNumbers
            configs={[
              { mass: 1, tension: 130, friction: 40 },
              { mass: 2, tension: 140, friction: 40 },
              { mass: 3, tension: 130, friction: 40 },
            ]}
            animateToNumber={income}
          />
        ) : Math.abs(income) < 1000000000 ? (
          <>
            <AnimatedNumbers
              configs={[
                { mass: 1, tension: 130, friction: 40 },
                { mass: 2, tension: 140, friction: 40 },
                { mass: 3, tension: 130, friction: 40 },
              ]}
              animateToNumber={+overMB.toFixed(2)}
            />
            M
          </>
        ) : (
          <>
            <AnimatedNumbers
              configs={[
                { mass: 1, tension: 130, friction: 40 },
                { mass: 2, tension: 140, friction: 40 },
                { mass: 3, tension: 130, friction: 40 },
              ]}
              animateToNumber={+overMB.toFixed(2)}
            />
            B
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(IncomeNum);
