import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import logo from '../../logo.svg'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth } from '../../utility'
import CreateBtn from '../../components/CreateBtn'
import ViewTab from '../../components/ViewTab'
import PriceList from '../../components/PriceList'
import MonthPicker from '../../components/MonthPicker'
import TotalPrice from '../../components/TotalPrice'

const items = [
  {
    "id": 1,
    "title": "去云南旅游",
    "price": 200,
    "date": "2018-09-10",
    "cid": 1

  },
  {
    "id": 2,
    "title": "去云南旅游",
    "price": 400,
    "date": "2018-09-10",
    "cid": 1
  },
  {
    "id": 3,
    "title": "理财收入",
    "price": 500,
    "date": "2018-09-10",
    "cid": 2
  }


];

const categories = {
  "1": {
    id: "1",
    name: "旅行",
    type: "outcome",
    iconName: "ios-plane"

  },
  "2": {
    id: "2",
    name: "理财",
    type: "income",
    iconName: "logo-yen"

  }

}


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW

    }
  }

  componentDidMount() {
    console.log(this.state.currentDate)
  }

  render() {
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.cid]
      return item
    })
    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })

    return (
      < React.Fragment >
        <div className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo"></img>
          </div>

          <div className="row">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onchange={(e) => { console.log(e) }}
              />
            </div>
          </div>

          <div className="col">
            <TotalPrice income={totalIncome} outcome={totalOutcome} />

          </div>
        </div>

        <div className="content-area py-3 px-3">
          <ViewTab activeTab={tabView} onTabChange={() => { }} />
          <CreateBtn onClick={() => { }} />
          <PriceList
            items={itemsWithCategory}
            onModifyItem={item => {
              console.log(item.id);
            }}
            onDeleteItem={item => {
              console.log("delete:" + item.id);
            }}
          />

        </div>


      </React.Fragment >
    )
  }
}

export default Home;