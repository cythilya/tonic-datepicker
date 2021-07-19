import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useColorMode,
  useColorStyle,
  Icon,
  Grid,
  Box,
  Button,
  Flex
} from "@trendmicro/react-styled-ui";
import {
  DAY,
  DEFAULT_WEEK_ROW,
  FEB_OF_LEAP_YEAR,
  MONTH_DAYS,
  MONTH,
} from './constants';
import Day from './Day';

export const dateToAry = (rawDate) => {
  const newDate = new Date(rawDate);
  const [month, date, year] = newDate.toLocaleDateString("en-US").split("/");
  return [+year, +month, +date];
};

export const dateToObj = (rawDate) => {
  const [year, month, date] = dateToAry(rawDate);
  return { year, month, date };
};

export const dateToStr = (rawDate, full = false) => {
  const newDate = dateToAry(rawDate);
  return newDate
    .map((item) => (full && item < 10 ? `0${item}` : item))
    .join("-");
};

const isValidDate = (dateStr) => !!new Date(dateStr).toJSON();

const Calendar = ({ startDate: rawDate, onSelect }) => {
  const today = new Date();
  const todayAry = dateToAry(today);
  const initDate = isValidDate(rawDate) ? rawDate : today;
  const [renderDate, setRenderDate] = useState(dateToObj(initDate));
  const [selectedDateStr, setSelectedDateStr] = useState(dateToStr(initDate));

  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  useEffect(() => {
    if (isValidDate(rawDate)) {
      const formattedDateStr = rawDate.replace(/(-)0(\d{1})/g, "$1$2");
      setRenderDate(dateToObj(rawDate));
      setSelectedDateStr(formattedDateStr);
    }
  }, [rawDate]);

  const getDays = ({ year, month }) => {
    const days = [];

    const isLeapYear = (checkYear) =>
      new Date(checkYear, 1, FEB_OF_LEAP_YEAR).getDate() === FEB_OF_LEAP_YEAR;
    const getMonthDays = (year, month) =>
      isLeapYear(year) && month === 2
        ? FEB_OF_LEAP_YEAR
        : MONTH_DAYS[month - 1];
    const getPrevMonthLastDate = (curDate) => {
      curDate.setDate(0);
      return curDate;
    };

    const daysLength = DEFAULT_WEEK_ROW * DAY.length;
    const curMonthDays = getMonthDays(year, month);
    const curMonthFirstDay = new Date(`${year}-${month}-01`).getDay();

    const prevMonthRemainLength = curMonthFirstDay % 7;
    const prevMonthLastDate = getPrevMonthLastDate(new Date(year, month - 1));
    const [prevYear, prevMonth, prevDate] = dateToAry(prevMonthLastDate);
    const prevMonthFirstRenderDate = prevDate - prevMonthRemainLength + 1;

    let nextMonthRemainLength =
      daysLength - curMonthDays - prevMonthRemainLength;
    nextMonthRemainLength =
      nextMonthRemainLength < 0
        ? nextMonthRemainLength + 7
        : nextMonthRemainLength;
    const [nextYear, nextMonth, nextDate] = dateToAry(new Date(year, month, 1));

    for (let i = 0; i < prevMonthRemainLength; i += 1) {
      days.push({
        year: prevYear,
        month: prevMonth,
        date: i + prevMonthFirstRenderDate
      });
    }

    for (let i = 0; i < curMonthDays; i += 1) {
      days.push({
        year,
        month,
        date: i + 1,
        isCurMonth: true,
        isToday: todayAry.join("") === `${year}${month}${i + 1}`
      });
    }

    for (let i = 0; i < nextMonthRemainLength; i += 1) {
      days.push({
        year: nextYear,
        month: nextMonth,
        date: i + nextDate
      });
    }
    return days;
  };

  const chageRenderDate = (action) => {
    setRenderDate(({ year, month, date }) =>
      dateToObj(new Date(year, month - 1 + action, date))
    );
  };

  const handleDateSelect = (dateStr) => {
    setSelectedDateStr(dateStr);
    onSelect(new Date(dateStr));
  };

  return (
    <Flex
      display="inline-flex"
      direction="column"
      px="6x"
      py="3x"
      border="1px solid #C9C9C9"
      boxShadow={colorStyle.shadow.md}
      border-radius="3px"
    >
      <Flex justify="space-between" mb="3x">
        <Button
          variant="ghost"
          type="button"
          aria-label="previous"
          onClick={() => chageRenderDate(-1)}
        >
          <Icon icon="angle-left" />
        </Button>
        <Button variant="ghost" type="button" aria-label="change mode">
          {MONTH[renderDate.month]} {renderDate.year}
        </Button>
        <Button
          variant="ghost"
          type="button"
          onClick={() => chageRenderDate(1)}
        >
          <Icon icon="angle-right" />
        </Button>
      </Flex>
      <Box>
        {
          <>
            <Grid templateRows="auto" templateColumns="repeat(7, 40px)">
              {DAY.map((dayName, idx) => (
                <Flex
                  height="10x"
                  align="center"
                  justify="center"
                  key={`${dayName}${idx}`}
                >
                  {dayName}
                </Flex>
              ))}
            </Grid>
            <Grid templateRows="auto" templateColumns="repeat(7, 40px)">
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
                      handleDateSelect={handleDateSelect}
                    />
                  );
                }
              )}
            </Grid>
          </>
        }
      </Box>
    </Flex>
  );
};

Calendar.propTypes = {
  startDate: PropTypes.string,
  onSelect: PropTypes.func
};

Calendar.defaultProps = {
  startDate: "",
  onSelect: () => {}
};

export default Calendar;
