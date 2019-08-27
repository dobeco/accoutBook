import React from "react";

import PriceList from "./components/PriceList";
import "./App.css";

class App extends React.Component {
  onModifyItem = () => {};
  onDeleteItem = () => {};

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
      </div>
    );
  }
}

export default App;
