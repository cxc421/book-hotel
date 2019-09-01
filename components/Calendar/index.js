import React, { PureComponent } from 'react';
import DateComponent from './Date';
import * as Styled from './styles';
import getMonthDays, {
  CALENDAR_MONTHS,
  WEEK_DAYS,
  getPreviousMonth,
  getNextMonth,
  getDateISO,
  isSameDay,
  isDate,
  zeroPad
} from './helper';

export const CalendarType = {
  SelectRange: 'calendar-type-select-range',
  SelectDate: 'calendar-type-select-date'
};

class Calendar extends PureComponent {
  static defaultProps = {
    type: CalendarType.SelectRange,
    disabledDates: [],
    calendarNum: 2
  };

  defaultMaxDate = null;

  state = {
    ...this.initState()
  };

  initState() {
    if (this.props.type === CalendarType.SelectRange) {
      return this.initStateOfTypeRange();
    }
    return this.initStateOfTypeDate();
  }

  initStateOfTypeDate() {
    const { selectDateStr, disabledDates } = this.props;

    let selectDate;
    try {
      selectDate = new Date(selectDateStr);
    } catch (err) {
      selectDate = new Date();
    }

    const month = selectDate.getMonth() + 1;
    const year = selectDate.getFullYear();

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    minDate.setMilliseconds(0);

    const maxDate = new Date(minDate.getTime());
    maxDate.setDate(maxDate.getDate() + 90);
    this.defaultMaxDate = maxDate;

    return {
      month,
      year,
      minDate,
      maxDate,
      selectStart: selectDate,
      selectEnd: selectDate,
      selectMaxDate: null,
      selectMinDate: null,
      selectDate,
      isSelecting: false,
      disabledDates
    };
  }

  initStateOfTypeRange() {
    const { selectStartStr, selectEndStr, disabledDates } = this.props;

    let selectStart, selectEnd;
    try {
      selectStart = new Date(selectStartStr);
      selectEnd = new Date(selectEndStr);
    } catch (err) {
      selectStart = selectEnd = null;
    }

    const minDate = new Date();
    const month = minDate.getMonth() + 1;
    const year = minDate.getFullYear();
    minDate.setDate(minDate.getDate() + 1);
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    minDate.setMilliseconds(0);

    const maxDate = new Date(minDate.getTime());
    maxDate.setDate(maxDate.getDate() + 90);
    this.defaultMaxDate = maxDate;

    return {
      month,
      year,
      minDate,
      maxDate,
      selectStart,
      selectEnd,
      selectMaxDate: null,
      selectMinDate: null,
      selectDate: null,
      isSelecting: false,
      disabledDates
    };
  }

  getSelectDateRange = (date, disabledDates) => {
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

  getNewDiabledDates = selectStart => {
    const { disabledDates } = this.props;
    const newDisabledDates = Array.from(disabledDates).sort();
    let newMaxDate = null;
    if (isDate(selectStart)) {
      let disabledDateLen = newDisabledDates.length;
      for (let i = 0; i < disabledDateLen; i++) {
        const _date = new Date(newDisabledDates[i]);
        if (_date > selectStart) {
          newDisabledDates.splice(i, 1);
          newMaxDate = _date;
          break;
        }
      }
    }
    return { newDisabledDates, newMaxDate };
  };

  onClickDate = date => {
    const {
      selectStart,
      selectEnd,
      isSelecting,
      selectMaxDate,
      selectMinDate
    } = this.state;

    const {
      onSelectDatesChange,
      type,
      selectDateStr,
      disabledDates
    } = this.props;

    if (type === CalendarType.SelectDate) {
      const curSelectDateStr = getDateISO(date);
      if (curSelectDateStr === selectDateStr) {
        console.log('Can not set same date');
        return;
      }
      onSelectDatesChange &&
        onSelectDatesChange(curSelectDateStr, curSelectDateStr);
      return;
    }

    if (isSelecting) {
      const startDateISO = getDateISO(selectStart);
      const endDateISO = getDateISO(selectEnd);

      if (startDateISO === endDateISO) {
        console.log('Can not select same date');
        return;
      }
      this.setState({
        isSelecting: false,
        disabledDates: !this.props.disabledDates.includes(endDateISO)
          ? this.props.disabledDates
          : this.state.disabledDates,
        maxDate: this.defaultMaxDate
      });
      onSelectDatesChange && onSelectDatesChange(startDateISO, endDateISO);
    } else {
      if (disabledDates.includes(getDateISO(date))) {
        console.log('Can not select disabled dates');
        return false;
      }

      const { newDisabledDates, newMaxDate } = this.getNewDiabledDates(date);
      const { selectMaxDate, selectMinDate } = this.getSelectDateRange(
        date,
        newDisabledDates
      );

      this.setState({
        selectDate: date,
        selectStart: date,
        selectEnd: date,
        selectMaxDate,
        selectMinDate,
        isSelecting: true,
        disabledDates: newDisabledDates,
        maxDate: newMaxDate || this.defaultMaxDate
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
    const { disabledDates } = this.state;

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

  renderCalendar(month, year, key) {
    const monthDays = getMonthDays(month, year);
    const renderDates = this.renderMonthDates(month);

    return (
      <Styled.CalendarWrapper key={key}>
        {this.renderMonthAndYear(month, year)}
        <Styled.Body>
          <>{Object.keys(WEEK_DAYS).map(this.renderDayLabel)}</>
          <>{monthDays.map(renderDates)}</>
        </Styled.Body>
      </Styled.CalendarWrapper>
    );
  }

  render() {
    const { calendarNum } = this.props;
    const calendarList = [];
    let { month, year } = this.state;
    for (let i = 0; i < calendarNum; i++) {
      if (i > 0) {
        const nextMonthInfo = getNextMonth(month, year);
        month = nextMonthInfo.month;
        year = nextMonthInfo.year;
      }
      calendarList.push(this.renderCalendar(month, year, i));
    }

    return (
      <Styled.Container>
        <Styled.LeftArrow
          src="/static/left_arrow.png"
          title="Prev Month"
          onMouseDown={this.toPrevMonth}
        />
        <Styled.RightArrow
          src="/static/right_arrow.png"
          title="Next Month"
          onMouseDown={this.toNextMonth}
        />
        {calendarList}
      </Styled.Container>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { type } = this.props;

    if (type === CalendarType.SelectDate) {
      const { selectDateStr } = this.props;

      if (selectDateStr !== prevProps.selectDateStr) {
        try {
          const newSelectDate = new Date(selectDateStr);
          this.setState({
            selectStart: newSelectDate,
            selectEnd: newSelectDate,
            selectDate: newSelectDate
          });
        } catch (err) {
          console.error(err);
        }
      }
    } else if (type === CalendarType.SelectRange) {
      const { selectStartStr, selectEndStr, disabledDates } = this.props;

      if (selectStartStr !== prevProps.selectStartStr) {
        this.setState({
          selectStart: new Date(selectStartStr)
        });
      }

      if (
        selectEndStr !== prevProps.selectEndStr ||
        disabledDates !== prevProps.disabledDates
      ) {
        if (disabledDates.includes(selectEndStr)) {
          const newSelectStart = new Date(selectStartStr);
          const { newDisabledDates, newMaxDate } = this.getNewDiabledDates(
            newSelectStart
          );
          this.setState(prevState => {
            return {
              disabledDates: newDisabledDates,
              selectEnd: new Date(selectEndStr),
              maxDate: prevState.isSelecting
                ? newMaxDate || this.defaultMaxDate
                : this.defaultMaxDate
            };
          });
        } else {
          this.setState({
            disabledDates,
            selectEnd: new Date(selectEndStr)
          });
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.disabledDates.includes(getDateISO(this.state.selectEnd))) {
      const { newDisabledDates, newMaxDate } = this.getNewDiabledDates(
        this.state.selectStart
      );

      this.setState(prevState => {
        return {
          disabledDates: newDisabledDates,
          maxDate: prevState.isSelecting
            ? newMaxDate || this.defaultMaxDate
            : this.defaultMaxDate
        };
      });
    }
  }
}

export default Calendar;
