import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@trendmicro/react-styled-ui';
import {
  DAY_BACKGROUND_COLOR,
  DAY_FONT_COLOR,
} from './constants';

const Day = ({
  date,
  dateInfoStr,
  isCurMonth,
  isSelectedDate,
  handleDateSelect,
}) => {
  const fontColor = DAY_FONT_COLOR[Number(isSelectedDate && isCurMonth)];
  const backgroundColor = DAY_BACKGROUND_COLOR[Number(isSelectedDate && isCurMonth)];

  return (
    <Flex
      align="center"
      backgroundColor={backgroundColor}
      color={fontColor}
      cursor="pointer"
      height="10x"
      justify="center"
      onClick={() => handleDateSelect(dateInfoStr)}
    >
      {date}
    </Flex>
  )
}

Day.propTypes = {
  date: PropTypes.number.isRequired,
  dateInfoStr: PropTypes.string.isRequired,
  handleDateSelect: PropTypes.func.isRequired,
  isCurMonth: PropTypes.bool,
  isSelectedDate: PropTypes.bool.isRequired,
};

Day.defaultProps = {
  isCurMonth: false,
};

export default Day;
