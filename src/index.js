// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// import Header from "./HeaderComponent/header";
// import Footer from "./FooterComponent/footer";
// import MainSearch from "./SearchComponent/MainSearchComponent/mainSearch";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <>
//     <Header />
//     <MainSearch/>
//     <Footer />
//   </>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Tab></Tab>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function Tab() {
  let [tab, setTab] = useState(0);
  let [items, setItems] = useState([]);
  let onSetTab = (tab) => setTab(tab);
  let content = null;
  useEffect(() => {
    setItems(["item 1", "item 2", "item 3"]);
  }, []);
  switch (tab) {
    case 1:
      content = <Tab1 items={items} />;
      break;
    case 2:
      content = <Tab2 items={items} />;
      break;
  }
  return (
    <div>
      <button onClick={() => onSetTab(1)}>set tab 1</button>
      <button onClick={() => onSetTab(2)}>set tab 2</button>
      {content}
    </div>
  );
}
function Tab1({ items }) {
  return (
    <div>
      {items.map((item, id) => (
        <li key={id}>{item}</li>
      ))}
    </div>
  );
}
function Tab2({ items }) {
  return (
    <div>
      {items.map((item, id) => (
        <h1 key={id}>{item}</h1>
      ))}
    </div>
  );
}
