import { FC } from "react";
import AnimatedNumbers from "react-animated-numbers";
import React from "react";

const LimitNum: FC<{ limit: number }> = (props) => {
  const { limit } = props;
  let overMB = limit;

  const sign = Math.sign(Number(limit));

  if (limit > 999999 && limit < 1000000000) {
    overMB = sign * (Math.abs(Number(limit)) / 1000000);
  }

  if (limit > 999999999) {
    overMB = sign * (Math.abs(Number(limit)) / 1000000000);
  }

  return (
    <div className="flex">
      $
      {limit < 1000000 ? (
        <AnimatedNumbers
          configs={[
            { mass: 1, tension: 130, friction: 40 },
            { mass: 2, tension: 140, friction: 40 },
            { mass: 3, tension: 130, friction: 40 },
          ]}
          animateToNumber={limit}
        />
      ) : limit < 1000000000 ? (
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
  );
};

export default React.memo(LimitNum);
