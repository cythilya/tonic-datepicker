import PropTypes from 'prop-types';
import Day from './Day';

const Week = ({
  getDays,
  renderDate,
  selectedDateStr,
  onSelectHandler,
}) => (
  <>
    {getDays({ ...renderDate, selectedDateStr }).map(
      ({ isCurMonth, isToday, ...dateInfo }) => {
        const dateInfoStr = Object.values(dateInfo).join('-');
        const isSelectedDate = selectedDateStr && selectedDateStr === dateInfoStr;

        return (
          <Day
            date={dateInfo.date}
            dateInfoStr={dateInfoStr}
            isCurMonth={isCurMonth}
            isSelectedDate={isSelectedDate}
            key={dateInfoStr}
            onSelectHandler={onSelectHandler}
          />
        );
      }
    )}
  </>
);

Week.propTypes = {
  getDays: PropTypes.func.isRequired,
  renderDate: PropTypes.object.isRequired,
  selectedDateStr: PropTypes.string,
  onSelectHandler: PropTypes.func.isRequired,
};

Day.defaultProps = {
  selectedDateStr: '',
};


export default Week;
