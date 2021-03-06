import { useRef, useState, useEffect } from "react";
import { InputGroup, Icon, Text } from "@trendmicro/react-styled-ui";
import { useTheme } from "@trendmicro/react-styled-ui";

import InputCell from "./InputCell";
import { useInputErrorStyle, useIconStyle, useInputStyle } from "./styles";

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

const DEFAULT_VALUE = "00";
const TimeInput = ({
    value,
    isInvalid,
    onChange,
    ...rest
  }) => {
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

  const inputErrorStyle = useInputErrorStyle();
  const errorStyle = isInvalid ? inputErrorStyle : {};
  const iconStyle = useIconStyle();
  const styleProps = useInputStyle({
    size: defaultSize,
    variant: defaultVariant
  });

  useEffect(() => {
    onChange(valueAry.join(SEPARATOR));
  });

  const onChangeCell = (targetIdx, value) => {
    setValueAry(
      valueAry.map((oriVal, idx) => (targetIdx === idx ? value : oriVal))
    );
  };

  return (
    <InputGroup
      data-value={valueAry.join(SEPARATOR)}
      {...styleProps}
      {...errorStyle}
      {...rest}
    >
      <Icon icon="clock" {...iconStyle} mr="3x" />
      <InputCell
        idx={0}
        ref={hourRef}
        initVal={initHour}
        defaultVal={DEFAULT_VALUE}
        max={23}
        width={inputWidth}
        nextRef={minuteRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={1}
        ref={minuteRef}
        initVal={initMinute}
        defaultVal={DEFAULT_VALUE}
        max={59}
        width={inputWidth}
        nextRef={secondRef}
        prevRef={hourRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={2}
        ref={secondRef}
        initVal={initSecond}
        defaultVal={DEFAULT_VALUE}
        max={59}
        width={inputWidth}
        prevRef={minuteRef}
        onChangeCell={onChangeCell}
      />
    </InputGroup>
  );
};

export default TimeInput;
