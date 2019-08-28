import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import logo from "../../logo.svg";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from "../../utility";
import CreateBtn from "../../components/CreateBtn";
import ViewTab from "../../components/ViewTab";
import PriceList from "../../components/PriceList";
import MonthPicker from "../../components/MonthPicker";
import TotalPrice from "../../components/TotalPrice";

const items = [
  {
    id: 1,
    title: "去云南旅游",
    price: 200,
    date: "2019-08-20",
    cid: 1
  },
  {
    id: 2,
    title: "去云南旅游",
    price: 400,
    date: "2018-09-10",
    cid: 1
  },
  {
    id: 3,
    title: "理财收入",
    price: 500,
    date: "2019-08-10",
    cid: 2
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
};

const newItem = {
  id: 4,
  title: "新添加的项目",
  price: 300,
  date: "2018-10-10",
  cid: 1
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(), // 当前年和月
      tabView: LIST_VIEW
    };
  }

  componentDidMount() {
    console.log(this.state.currentDate);
  }

  // 模式切换
  changeView = view => {
    this.setState({ tabView: view });
  };
  changeDate = (year, month) => {
    this.setState({
      currentData: { year, month }
    });
  };
  // 修改item
  modifyItem = modifiedItem => {
    const modifiedItems = this.state.items.map(item => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: "更新后的标题" };
      } else {
        return item;
      }
    });
    this.setState({
      items: modifiedItems
    });
  };

  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    });
  };

  deleteItem = deleteItem => {
    const filteredItems = this.state.items.filter(
      item => item.id !== deleteItem.id
    );
    this.setState({
      items: filteredItems
    });
  };

  render() {
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items
      .map(item => {
        item.category = categories[item.cid];
        return item;
      })
      .filter(item => {
        return item.date.includes(
          currentDate.year + '-' + padLeft(currentDate.month)
        );
      });
    let totalIncome = 0,
      totalOutcome = 0;
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });

    return (
      <React.Fragment>
        <div className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo"></img>
          </div>

          <div className="row">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
          </div>

          <div className="col">
            <TotalPrice income={totalIncome} outcome={totalOutcome} />
          </div>
        </div>

        <div className="content-area py-3 px-3">
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          )}
          {tabView === CHART_VIEW && <h1>图标</h1>}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
