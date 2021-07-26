import { useState, useEffect, forwardRef } from "react";
import { InputBase } from "@trendmicro/react-styled-ui";

import { DEFAULT_VALUE } from "./TimeInput";
const TimeInputCell = forwardRef(
  (
    {
      idx,
      initVal,
      max,
      min = 0,
      width,
      nextRef = null,
      prevRef = null,
      onChangeCell
    },
    ref
  ) => {
    const START_POSITION = 0;
    const END_POSITION = DEFAULT_VALUE.length;
    const [value, setValue] = useState(initVal);
    const [isValid, setIsValid] = useState(true);
    const [curPosition, setCurPosition] = useState(0);

    useEffect(() => {
      if (curPosition === END_POSITION && nextRef) {
        nextRef.current.focus();
        nextRef.current.setSelectionRange(START_POSITION, START_POSITION);
      } else {
        ref.current.setSelectionRange(curPosition, curPosition);
      }
    }, [curPosition]);

    useEffect(() => {
      onChangeCell(idx, value, isValid);
    }, [value, isValid]);

    const formattedValue = (valueStr, isPadEnd = false) => {
      const PAD_STR = "0";
      const VAL_LEN = DEFAULT_VALUE.length;
      const trimValue = valueStr
        .replace(/[^\d+]/g, "")
        .slice(START_POSITION, END_POSITION);
      return isPadEnd
        ? trimValue.padEnd(VAL_LEN, PAD_STR)
        : trimValue.padStart(VAL_LEN, PAD_STR);
    };

    const checkIsValid = (value) => {
      setIsValid(value >= min && value <= max);
    };

    const onChange = (e) => {
      const { value: inputValue, selectionStart } = e.target;
      const trimValue = formattedValue(inputValue, true);

      setValue(trimValue);
      checkIsValid(+trimValue);
      setCurPosition(selectionStart);
    };

    const onKeyDown = (e) => {
      const { key, target } = e;
      const { selectionStart, value } = target;
      const isStartIdx = selectionStart === START_POSITION;
      const isEndIdx = selectionStart === END_POSITION;
      const valueNum = +value;
      const downVal =
        valueNum <= min ? `${max}` : formattedValue(`${valueNum - 1}`);
      const upVal =
        valueNum >= max ? DEFAULT_VALUE : formattedValue(`${valueNum + 1}`);

      switch (key) {
        case "ArrowLeft":
        case "Backspace":
          isStartIdx && prevRef && prevRef.current.focus();
          break;
        case "ArrowRight":
          isEndIdx && nextRef && nextRef.current.focus();
          break;
        case "ArrowDown":
          setValue(downVal);
          checkIsValid(+downVal);
          break;
        case "ArrowUp":
          setValue(upVal);
          checkIsValid(+upVal);
          break;
        default:
          break;
      }
    };

    return (
      <InputBase
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        width={width}
      />
    );
  }
);

export default TimeInputCell;
