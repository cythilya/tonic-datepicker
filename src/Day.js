import PropTypes from 'prop-types';
import { useState } from 'react';
import { Flex } from '@trendmicro/react-styled-ui';
import {
  DAY_BACKGROUND_COLOR,
  DAY_FONT_COLOR,
} from './constants';

export const calculateDayBackgroundColor = ({
  isSelected = false,
  isHover = false,
}) => {
  if (isSelected) {
    return DAY_BACKGROUND_COLOR.SELECTED
  } else if (!isSelected && isHover) {
    return DAY_BACKGROUND_COLOR.HOVERED;
  }
  return DAY_BACKGROUND_COLOR.DEFAULT
};

const Day = ({
  date,
  dateInfoStr,
  isSelected,
  onSelectHandler,
}) => {
  const [isHover, setHoverState] = useState(false);

  return (
    <Flex
      align="center"
      backgroundColor={calculateDayBackgroundColor({ isHover, isSelected })}
      color={DAY_FONT_COLOR[isSelected]}
      cursor="pointer"
      height="10x"
      justify="center"
      onClick={() => onSelectHandler(dateInfoStr)}
      onMouseEnter={() => { setHoverState(true) }}
      onMouseLeave={() => { setHoverState(false) }}
    >
      {date}
    </Flex>
  )
}
  ;

Day.propTypes = {
  date: PropTypes.number.isRequired,
  dateInfoStr: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
};

export default Day;
