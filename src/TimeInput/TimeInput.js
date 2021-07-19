import { useRef, useState, useEffect } from "react";
import { Input, Flex, Icon } from "@trendmicro/react-styled-ui";

import { useTimeInputErrorStyle, useIconStyle } from "./styles";

const TimeInput = ({ value, onChange, ...rest }) => {
  const timeInputEl = useRef(null);
  const timeInputErrorStyle = useTimeInputErrorStyle();
  const iconStyle = useIconStyle();
  const [inputTime, setInputTime] = useState(value || "");
  const [isInvalid, setIsInvalid] = useState(false);
  const [curPosition, setCurPosition] = useState(0);

  const DEFAULT_VALUE = "--:--:--";
  const MAX_TIME_LEN = DEFAULT_VALUE.length;
  const inputErrorStyle =
    inputTime.length === MAX_TIME_LEN && isInvalid ? timeInputErrorStyle : {};

  useEffect(() => {
    timeInputEl.current.setSelectionRange(curPosition, curPosition);
  }, [curPosition]);

  const inRange = (num, min, max) => +num >= min && +num <= max;

  const checkTime = (timeStr) => {
    const timeGroupReg = /(\d{1,2})?(\d{1,2})?(\d{1,2})?/;
    const [, hour, min, sec] = timeStr.match(timeGroupReg) || [];

    return {
      timeValue: [hour, min, sec].filter((value) => value).join(":"),
      isValidTime:
        inRange(hour, 0, 24) && inRange(min, 0, 59) && inRange(sec, 0, 59)
    };
  };

  const onChangeTime = (e) => {
    const { value, selectionStart } = e.target;
    const trimValue = value.replace(/[^\d+]/g, "");
    const { timeValue, isValidTime } = checkTime(trimValue);
    setInputTime(timeValue);
    setIsInvalid(!isValidTime);
    onChange(timeValue, isValidTime);

    if (selectionStart) {
      const position =
        selectionStart === 2 || selectionStart === 5
          ? selectionStart + 1
          : selectionStart;
      if (selectionStart === timeValue.length && selectionStart === position)
        return;
      setCurPosition(position);
    }
  };

  const onKeyDown = (e) => {
    const { key, shiftKey, target } = e;
    const { selectionStart } = target;
    const isTabKey = key === "Tab";
    const groupSelection = [
      [0, 2],
      [3, 5],
      [6, 8]
    ];
    const groupIdx = groupSelection.findIndex((group) =>
      inRange(selectionStart, ...group)
    );
    const nextGroup = groupSelection[groupIdx + 1];
    const prevGroup = groupSelection[groupIdx - 1];

    if (isTabKey && shiftKey && prevGroup) {
      // Tab + shiftKey
      e.preventDefault();
      target.setSelectionRange(...prevGroup);
    } else if (isTabKey && !shiftKey && nextGroup) {
      // Tab
      e.preventDefault();
      target.setSelectionRange(...nextGroup);
    }
  };

  return (
    <Flex direction="column" {...rest}>
      <Flex position="relative" align="center" width={112}>
        <Flex align="center" position="absolute" left={0} pl="3x" zIndex={3}>
          <Icon icon="clock" {...iconStyle} />
        </Flex>
        <Input
          ref={timeInputEl}
          pl="9x"
          placeholder={DEFAULT_VALUE}
          value={inputTime}
          onChange={onChangeTime}
          onKeyDown={onKeyDown}
          {...inputErrorStyle}
        />
      </Flex>
    </Flex>
  );
};

export default TimeInput;
