import React from 'react'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'
class MonthPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(event) {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    })

  };
  selectYear = (event, yearNumber) => {
    event.preventDefault();
    this.setState({
      selectedYear: yearNumber
    })

  }
  selectMonth = (event, monthNumber) => {
    event.preventDefault();
    this.setState({
      isOpen: false
    });
    this.props.onChange(this.state.selectedYear, monthNumber);
  }

  render() {
    const { year, month } = this.props;
    const { isOpen, selectedYear } = this.state;

    const monthRange = range(12, 1);
    const yearRange = range(9, -4).map((number) => { return number + year });
    return (
      <div className=" dropdown month-picker-component">
        <h4>选择月份</h4>
        <button className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)} 月`}

        </button>
        {
          isOpen &&
          <div className='dropdown-menu' style={{ display: 'inline-block' }}>
            <div className="row">
              <div className="col border-right">
                {
                  yearRange.map((yearNumber, index) =>
                    <a href="#"
                      key={index}
                      onClick={(e) => { this.selectedYear = this.selectYear(e, yearNumber) }}
                      className={(yearNumber === selectedYear) ? 'dropdown-item active' : 'dropdown-item'}>{yearNumber} 年</a>
                  )
                }
              </div>
              <div className="col">
                {
                  monthRange.map((monthNumber, index) =>
                    <a href='#'
                      key={index}
                      onClick={(e) => { this.selectMonth(e, monthNumber) }}
                      className={(monthNumber === month) ? 'dropdown-item active' : 'dropdown-item'}>
                      {padLeft(monthNumber)}月
                    </a>
                  )
                }
              </div>
            </div>
          </div>
        }


      </div>


    )
  }




}

export default MonthPicker