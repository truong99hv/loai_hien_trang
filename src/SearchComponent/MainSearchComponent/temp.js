import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
let items = [
  { id: 1, name: "test 1" },
  { id: 2, name: "test 2" },
  { id: 2, name: "test 3" },
];
let showDetail = (item) => {
  console.log(item);
};
root.render(
  <div>
    <Tab></Tab>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function ListItem(props) {
  let item = props.item;
  let onClick = props.onClick;
  return <li onClick={() => props.onClick(item)}> {item.name}</li>;
}
function Counter() {
  let [count, setCount] = useState(0);
  let onTangBoDem = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => onTangBoDem()}> tang bo dem</button>
    </div>
  );
}
function Search() {
  let [search, setSearch] = useState("");
  let onSetValueSearch = (e) => {
    setSearch(e.target.value);
  };

  let [search2, setSearch2] = useState("");
  let onSetValueSearch2 = (e) => {
    setSearch2(e.target.value);
  };
  useEffect(() => {
    console.log("use effect ");
  });

  useEffect(() => {
    console.log("use effect init");
  }, []);
  useEffect(() => {
    console.log("use effect when change search");
  }, [search]);
  console.log("render");
  return (
    <div>
      <input
        value={search}
        onInput={(e) => onSetValueSearch(e)}
        style={{ border: "solid" }}
      ></input>

      <input
        value={search2}
        onInput={(e) => onSetValueSearch2(e)}
        style={{ border: "solid" }}
      ></input>
    </div>
  );
}
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
