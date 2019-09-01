import React, { PureComponent } from 'react';
import * as Styled from './styles';
import Calendar, { CalendarType } from '../Calendar';

class DatePicker extends PureComponent {
  wrapperRef = React.createRef();

  state = {
    showCalendar: false
  };

  onSelectDatesChange = startDateStr => {
    this.setState({
      showCalendar: false
    });
    this.props.onChange(startDateStr);
  };

  toShowCalendar = () => {
    this.setState({ showCalendar: true });
  };

  stopEventProp = e => {
    e.stopPropagation();
  };

  onClickDocument = event => {
    if (
      this.state.showCalendar &&
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({ showCalendar: false });
    }
  };

  render() {
    const { showCalendar } = this.state;
    const { selectDateStr, disabledDates } = this.props;
    const showDateStr = selectDateStr.split('-').join(' - ');

    return (
      <Styled.InputWrapper ref={this.wrapperRef} onClick={this.toShowCalendar}>
        <Styled.InputText>{showDateStr}</Styled.InputText>
        <Styled.InputDownIcon />
        {showCalendar && (
          <Styled.CalendarArea onClick={this.stopEventProp}>
            <Calendar
              calendarNum={1}
              type={CalendarType.SelectDate}
              selectDateStr={selectDateStr}
              onSelectDatesChange={this.onSelectDatesChange}
              disabledDates={disabledDates}
            />
          </Styled.CalendarArea>
        )}
      </Styled.InputWrapper>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument);
  }
}

export default DatePicker;
