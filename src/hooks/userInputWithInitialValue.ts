import { ChangeEvent, useState } from "react";

const useInputWithInitialValue = (
  validateValue: (value: number | string) => boolean,
  initialValue: string | number
) => {
  const [enterValue, setEnterValue] = useState(initialValue);
  const [touch, setTouch] = useState(false);

  const valid = validateValue(enterValue);
  const hasError = !valid && touch;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnterValue(event.target.value);
  };

  const reset = () => {
    setEnterValue("");
    setTouch(false);
  };

  const inputBlurHandler = () => {
    setTouch(true);
  };

  return {
    value: enterValue,
    isvalid: valid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: inputBlurHandler,
    reset,
  };
};

export default useInputWithInitialValue;
