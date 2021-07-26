import { useRef, useState, useEffect } from "react";
import { InputGroup, Icon, Text } from "@trendmicro/react-styled-ui";
import { useTheme } from "@trendmicro/react-styled-ui";

import TimeInputCell from "./TimeInputCell";
import { useTimeInputErrorStyle, useIconStyle, useInputStyle } from "./styles";

const defaultSize = "md";
const defaultVariant = "outline";

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "14px verdana").
 *
 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
  // if given, use cached canvas for better performance
  // else, create new canvas
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export const DEFAULT_VALUE = "00";
const TimeInput = ({ value, onChange, ...rest }) => {
  const SEPARATOR = ":";
  const initValAry = value?.split(SEPARATOR) || [
    DEFAULT_VALUE,
    DEFAULT_VALUE,
    DEFAULT_VALUE
  ];
  const [initHour, initMinute, initSecond] = initValAry;

  const theme = useTheme();
  const font = `${theme.fontSizes.sm} ${theme.fonts.base}`;
  const inputWidth = Math.floor(getTextWidth("88", font));

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const [valueAry, setValueAry] = useState(initValAry);
  const [validAry, setValidAry] = useState([true, true, true]);
  const isInValid = validAry.includes(false);

  const timeInputErrorStyle = useTimeInputErrorStyle();
  const inputErrorStyle = isInValid ? timeInputErrorStyle : {};
  const iconStyle = useIconStyle();
  const styleProps = useInputStyle({
    size: defaultSize,
    variant: defaultVariant
  });

  useEffect(() => {
    onChange(valueAry.join(SEPARATOR), !isInValid);
  });

  const onChangeCell = (targetIdx, value, isValid) => {
    setValueAry(
      valueAry.map((oriVal, aryIdx) => (targetIdx === aryIdx ? value : oriVal))
    );
    setValidAry(
      validAry.map((oriStatus, aryIdx) =>
        targetIdx === aryIdx ? isValid : oriStatus
      )
    );
  };

  return (
    <InputGroup
      tabIndex={-1}
      {...styleProps}
      {...inputErrorStyle}
      {...rest}
    >
      <Icon icon="clock" {...iconStyle} mr="3x" />
      <TimeInputCell
        idx={0}
        ref={hourRef}
        initVal={initHour}
        max={23}
        width={inputWidth}
        nextRef={minuteRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <TimeInputCell
        idx={1}
        ref={minuteRef}
        initVal={initMinute}
        max={59}
        width={inputWidth}
        nextRef={secondRef}
        prevRef={hourRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <TimeInputCell
        idx={2}
        ref={secondRef}
        initVal={initSecond}
        max={59}
        width={inputWidth}
        prevRef={minuteRef}
        onChangeCell={onChangeCell}
      />
    </InputGroup>
  );
};

export default TimeInput;
