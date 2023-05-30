import "./sidebar.css";
import {
  AiFillQuestionCircle,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai";
import getDataFromApi from "../../../components/getDataFromApi";
import React, {
  useContext,
  useEffect,
  useState,
  memo,
  useCallback,
} from "react";
import { DataContext } from "../../../context/DataContext";

function convertObject(object) {
  let result = [];
  for (let key in object) {
    object[key].forEach((item) => {
      result.push(`&${key}=${item}`);
    });
  }
  return result.join("");
}

export const UseDataContextSideBar = () => {
  const { setCurrentPage, setDataFilter } = useContext(DataContext);
  return (
    <RenderSideBarFunction
      setCurrentPage={setCurrentPage}
      setDataFilter={setDataFilter}
    />
  );
};

export const RenderSideBarFunction = memo((props) => {
  const [filterList, setFilterList] = useState({
    "loaihientrang_ids[]": [],
    "province_ids[]": [],
    "sach_do_ids[]": [],
    "iucn_ids[]": [],
    search: [],
  });
  const onSetFilter = useCallback(
    (control) => (e) => {
      const isChecked = e.target.checked;
      const value = e.target.value;
      if (isChecked) {
        setFilterList((prevFilterList) => ({
          ...prevFilterList,
          [control]: [...prevFilterList[control], value],
        }));
      } else {
        setFilterList((prevFilterList) => ({
          ...prevFilterList,
          [control]: prevFilterList[control].filter((item) => item !== value),
        }));
      }
    },
    [setFilterList]
  );

  useEffect(() => {
    const filter = convertObject(filterList);
    props.setDataFilter((prevFilterList) => {
      if (prevFilterList.indexOf("&search") === -1) {
        return filter;
      } else {
        return (
          filter +
          prevFilterList.substring(prevFilterList.lastIndexOf("&search"))
        );
      }
    });
    props.setCurrentPage(1);
  }, [filterList, props]);

  return <RenderSideBar onSetFilter={onSetFilter} filterList={filterList} />;
});

const RenderSideBar = memo(({ onSetFilter, filterList }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const returnData = async () => {
      try {
        const dataList = [];
        const loaihientrangList = await getDataFromApi("loaihientrang");
        const newLoaihientrang = [];
        loaihientrangList.forEach((item) => {
          newLoaihientrang.push({
            id: item.id,
            ten: item.ten,
          });
        });
        dataList.push(newLoaihientrang);

        const provincesList = await getDataFromApi("provinces");
        const newProvinces = [];
        provincesList.forEach((item) => {
          newProvinces.push({
            id: item.id,
            ten: item.name,
          });
        });
        dataList.push(newProvinces);

        const redbookList = await getDataFromApi("redbook");
        const newRedbook = [];
        redbookList[0].childs.forEach((item) => {
          newRedbook.push({
            id: item.id,
            ten: item.ten,
            ma_danh_muc: item.ma_danh_muc,
          });
        });
        dataList.push(newRedbook);

        const iucnList = await getDataFromApi("iucn");
        const newiucnList = [];
        iucnList[0].childs.forEach((item) => {
          newiucnList.push({
            id: item.id,
            ten: item.ten,
            ma_danh_muc: item.ma_danh_muc,
          });
        });
        dataList.push(newiucnList);
        setData(dataList);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    returnData();
  }, []);
  return (
    <Render data={data} onSetFilter={onSetFilter} filterList={filterList} />
  );
});

const Render = ({ data, onSetFilter, filterList = {} }) => {
  const formatIUCNShow = (item) => {
    return `${item.ma_danh_muc} - ${item.ten}`;
  };
  const formatProvincesShow = (item) => {
    return `${item.ten}`;
  };
  return (
    <>
      <div className="sidebarContainer">
        BỘ LỌC
        <AiFillQuestionCircle
          style={{
            fontSize: "18px",
            marginLeft: "10px",
          }}
        />
        <hr className="hrSideBar" />
        <SiderBarFilter
          name="Loài hiện trạng"
          items={data[0]}
          formatShow={formatProvincesShow}
          onSetValue={onSetFilter("loaihientrang_ids[]")}
          value={filterList["loaihientrang_ids[]"]}
        />
        <hr />
        <SiderBarFilter
          name="Địa giới hành chính"
          items={data[1]}
          formatShow={formatProvincesShow}
          onSetValue={onSetFilter("province_ids[]")}
          value={filterList["province_ids[]"]}
        />
        <hr />
        <SiderBarFilter
          name="Sách đỏ"
          items={data[2]}
          formatShow={formatIUCNShow}
          onSetValue={onSetFilter("sach_do_ids[]")}
          value={filterList["sach_do_ids[]"]}
        />
        <hr />
        <SiderBarFilter
          name="IUCN"
          items={data[3]}
          formatShow={formatIUCNShow}
          onSetValue={onSetFilter("iucn_ids[]")}
          value={filterList["iucn_ids[]"]}
        />
      </div>
    </>
  );
};

export default Render;
const SiderBarFilter = memo(
  ({ value = [], items = [], formatShow = () => "", name, onSetValue }) => {
    let [show, setShow] = useState(false);
    return (
      <ul className="ulSideBar">
        <h3 className="title-filter" onClick={() => setShow(!show)}>
          <span>{show ? <AiOutlineDown /> : <AiOutlineRight />}</span>

          {name}
        </h3>
        <hr className="hr-full" />
        {show &&
          items.length > 0 &&
          items.map((item, index) => (
            <div key={index} className="a">
              <label key={`iucn-${item.id}`} htmlFor={`iucn-${item.id}`}>
                <li>
                  <input
                    id={`iucn-${item.id}`}
                    type="checkbox"
                    value={item.id}
                    checked={value.includes("" + item.id)}
                    onChange={onSetValue}
                  />
                  {formatShow(item)}
                </li>
              </label>
              <hr className="hr-full" />
            </div>
          ))}
      </ul>
    );
  }
);
