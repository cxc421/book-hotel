import React, { Component } from 'react';
import DateComponent from './Date';
import * as Styled from './styles';
import getMonthDays, {
  CALENDAR_MONTHS,
  WEEK_DAYS,
  getPreviousMonth,
  getNextMonth,
  getDateISO,
  isSameDay,
  zeroPad
} from './helper';

class Calendar extends Component {
  state = {
    ...this.initState()
  };

  initState() {
    const minDate = new Date();
    const month = minDate.getMonth() + 1;
    const year = minDate.getFullYear();
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    minDate.setMilliseconds(0);

    const maxDate = new Date(minDate.getTime());
    maxDate.setDate(maxDate.getDate() + 90);

    return {
      month,
      year,
      minDate,
      maxDate,
      selectStart: null,
      selectEnd: null,
      selectMaxDate: null,
      selectMinDate: null,
      selectDate: null,
      isSelecting: false
    };
  }

  getSelectDateRange = date => {
    const { disabledDates } = this.props;
    const { minDate, maxDate } = this.state;
    const dateStr = getDateISO(date);

    let disabledMinStr = null;
    for (let i = 0; i < disabledDates.length; i++) {
      const disableDateStr = disabledDates[i];
      if (disableDateStr > dateStr) break;
      disabledMinStr = disableDateStr;
    }

    let disabledMaxStr = null;
    for (let i = disabledDates.length - 1; i >= 0; i--) {
      const disableDateStr = disabledDates[i];
      if (disableDateStr < dateStr) break;
      disabledMaxStr = disableDateStr;
    }

    let selectMinDate = minDate;
    if (disabledMinStr) {
      selectMinDate = new Date(disabledMinStr);
      selectMinDate.setDate(selectMinDate.getDate() + 1);
    }

    let selectMaxDate = maxDate;
    if (disabledMaxStr) {
      selectMaxDate = new Date(disabledMaxStr);
      selectMaxDate.setDate(selectMaxDate.getDate() - 1);
    }

    return {
      selectMinDate,
      selectMaxDate
    };
  };

  onClickDate = date => {
    const {
      selectStart,
      selectEnd,
      isSelecting,
      selectMaxDate,
      selectMinDate
    } = this.state;

    if (isSelecting) {
      // if (date < selectMinDate || date > selectMaxDate) {
      //   return false;
      // }

      const startDateISO = getDateISO(selectStart);
      const endDateISO = getDateISO(selectEnd);

      if (startDateISO === endDateISO) {
        console.log('Can not select same date');
      } else {
        this.setState({
          isSelecting: false
        });
      }
    } else {
      const { selectMaxDate, selectMinDate } = this.getSelectDateRange(date);

      this.setState({
        selectDate: date,
        selectStart: date,
        selectEnd: date,
        selectMaxDate,
        selectMinDate,
        isSelecting: true
      });
    }
  };

  onMouseEnterDate = date => {
    const {
      isSelecting,
      selectMaxDate,
      selectMinDate,
      selectDate
    } = this.state;

    if (!isSelecting) return false;

    if (date < selectMinDate) {
      date = selectMinDate;
    } else if (date > selectMaxDate) {
      date = selectMaxDate;
    }

    if (date > selectDate) {
      this.setState({ selectStart: selectDate, selectEnd: date });
    } else {
      this.setState({ selectStart: date, selectEnd: selectDate });
    }
  };

  toPrevMonth = () => {
    const { month, year } = this.state;
    const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
      month,
      year
    );

    this.setState({
      month: prevMonth,
      year: prevMonthYear
    });
  };

  toNextMonth = () => {
    const { month, year } = this.state;
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    this.setState({
      month: nextMonth,
      year: nextMonthYear
    });
  };

  renderMonthAndYear(month, year) {
    const monthName = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ];

    return (
      <Styled.Header>
        <Styled.MonthAndYear>
          {monthName} {year}
        </Styled.MonthAndYear>
      </Styled.Header>
    );
  }

  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day];
    return <Styled.DayLabel key={daylabel}>{daylabel}</Styled.DayLabel>;
  };

  renderMonthDates = month => (date, index) => {
    const { disabledDates } = this.props;
    const {
      selectStart,
      selectEnd,
      isSelecting,
      minDate,
      maxDate
    } = this.state;
    const _dateStr = date.join('-');
    const _date = new Date(_dateStr);
    const text = month === _date.getMonth() + 1 ? _date.getDate() : '';

    const disabled =
      _date < minDate ||
      _date > maxDate ||
      disabledDates.includes(_dateStr) ||
      text === '';

    const props = {
      key: _dateStr,
      disabled,
      isSelecting,
      isSelectStart: isSameDay(selectStart, _date),
      isSelectEnd: isSameDay(selectEnd, _date),
      isSelectThrough:
        selectStart && selectEnd && _date >= selectStart && selectEnd >= _date,
      title: _dateStr,
      onClick: () => this.onClickDate(_date),
      onMouseEnter: () => this.onMouseEnterDate(_date)
    };

    return <DateComponent {...props}>{text}</DateComponent>;
  };

  renderCalendar(month, year) {
    const monthDays = getMonthDays(month, year);
    const renderDates = this.renderMonthDates(month);

    return (
      <Styled.CalendarWrapper>
        {this.renderMonthAndYear(month, year)}
        <Styled.Body>
          <>{Object.keys(WEEK_DAYS).map(this.renderDayLabel)}</>
          <>{monthDays.map(renderDates)}</>
        </Styled.Body>
      </Styled.CalendarWrapper>
    );
  }

  render() {
    const { month, year } = this.state;
    const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

    return (
      <Styled.Container>
        <Styled.LeftArrow
          src="/static/left_arrow.png"
          onMouseDown={this.toPrevMonth}
        />
        <Styled.RightArrow
          src="/static/right_arrow.png"
          onMouseDown={this.toNextMonth}
        />
        {this.renderCalendar(month, year)}
        {this.renderCalendar(nextMonth, nextMonthYear)}
      </Styled.Container>
    );
  }
}

export default Calendar;
