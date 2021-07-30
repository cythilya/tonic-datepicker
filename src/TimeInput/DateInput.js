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

const DEFAULT_YEAR = "1900";
const DEFAULT_DATE = "01";
const DateInput = ({
    value,
    isInvalid,
    onChange,
    ...rest
  }) => {
  const SEPARATOR = "-";
  const MAX_YEAR = String(new Date().getFullYear());
  const initValAry = value?.split(SEPARATOR) || [
    DEFAULT_YEAR,
    DEFAULT_DATE,
    DEFAULT_DATE
  ];
  const [initYear, initMonth, initDate] = initValAry;

  const theme = useTheme();
  const font = `${theme.fontSizes.sm} ${theme.fonts.base}`;
  const yearWidth = Math.floor(getTextWidth("8888", font));
  const dateWidth = Math.floor(getTextWidth("88", font));

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dateRef = useRef(null);
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
      <Icon icon="calendar" {...iconStyle} mr="3x" />
      <InputCell
        idx={0}
        ref={yearRef}
        initVal={initYear}
        defaultVal={DEFAULT_YEAR}
        max={MAX_YEAR}
        width={yearWidth}
        nextRef={monthRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={1}
        ref={monthRef}
        initVal={initMonth}
        defaultVal={DEFAULT_DATE}
        max={12}
        width={dateWidth}
        nextRef={dateRef}
        prevRef={yearRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={2}
        ref={dateRef}
        initVal={initDate}
        defaultVal={DEFAULT_DATE}
        max={31}
        width={dateWidth}
        prevRef={monthRef}
        onChangeCell={onChangeCell}
      />
    </InputGroup>
  );
};

export default DateInput;
