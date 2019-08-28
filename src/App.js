import React from "react";

import PriceList from "./components/PriceList";
import ViewTab from "./components/ViewTab";
import MonthPicker from "./components/MonthPicker";
import CreateBtn from "./components/CreateBtn";
import TotalPrice from "./components/TotalPrice";
import { LIST_VIEW, CHART_VIEW } from './utility';
import "./App.css";

class App extends React.Component {
  onModifyItem = () => { };
  onDeleteItem = () => { };

  render() {
    const items = [
      {
        id: 1,
        title: "去云南旅游",
        price: 200,
        date: "2018-09-10",
        category: {
          id: "1",
          name: "旅行",
          type: "outcome",
          iconName: "ios-plane"
        }
      },
      {
        id: 2,
        title: "去湖南旅游",
        price: 300,
        date: "2018-01-10",
        category: {
          id: "2",
          name: "旅行",
          type: "income",
          iconName: "ios-plane"
        }
      }

    ];

    return (
      <div className="App">


        <PriceList
          items={items}
          onModifyItem={item => {
            console.log(item.id);
          }}
          onDeleteItem={item => {
            console.log("delete:" + item.id);
          }}
        />

        <ViewTab
          activeTab={LIST_VIEW}
          onTabChange={(view) => { console.log(view) }}
        />

        <MonthPicker
          year={2019}
          month={5}
          onChange={(year, month) => { console.log(year, month) }}
        />
        <CreateBtn onClick={item => { console.log('a') }} />
        <TotalPrice income="15" outcome="555" />
      </div>
    );
  }
}

export default App;
