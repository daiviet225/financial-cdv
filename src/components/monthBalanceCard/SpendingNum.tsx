import { FC } from "react";
import AnimatedNumbers from "react-animated-numbers";
import React from "react";

const SpendingNum: FC<{ spending: number }> = (props) => {
  const { spending } = props;

  let overMB = spending;

  const sign = Math.sign(Number(spending));

  if (spending > 999999 && spending < 1000000000) {
    overMB = sign * (Math.abs(Number(spending)) / 1000000);
  }

  if (spending > 999999999) {
    overMB = sign * (Math.abs(Number(spending)) / 1000000000);
  }
  return (
    <>
      {spending < 1000000 ? (
        <AnimatedNumbers
          configs={[
            { mass: 1, tension: 130, friction: 40 },
            { mass: 2, tension: 140, friction: 40 },
            { mass: 3, tension: 130, friction: 40 },
          ]}
          animateToNumber={spending}
        />
      ) : spending < 1000000000 ? (
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
    </>
  );
};

export default React.memo(SpendingNum);
