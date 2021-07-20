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
  onSelectHandler,
}) => (
  <Flex
    align="center"
    backgroundColor={DAY_BACKGROUND_COLOR[Number(isSelectedDate && isCurMonth)]}
    color={DAY_FONT_COLOR[Number(isSelectedDate && isCurMonth)]}
    cursor="pointer"
    height="10x"
    justify="center"
    onClick={() => onSelectHandler(dateInfoStr)}
  >
    {date}
  </Flex>
);

Day.propTypes = {
  date: PropTypes.number.isRequired,
  dateInfoStr: PropTypes.string.isRequired,
  isCurMonth: PropTypes.bool,
  isSelectedDate: PropTypes.bool.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
};

Day.defaultProps = {
  isCurMonth: false,
};

export default Day;
