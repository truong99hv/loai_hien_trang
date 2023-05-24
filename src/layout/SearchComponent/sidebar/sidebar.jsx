import "./sidebar.css";
import {
  AiFillQuestionCircle,
  AiOutlineArrowDown,
  AiOutlineArrowRight,
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
  console.log("render-father");
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

  return <RenderSideBar onSetFilter={onSetFilter} />;
});

const RenderSideBar = memo(({ onSetFilter }) => {
  console.log("render-sidebar");
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
        console.log(dataList);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    returnData();
  }, []);
  return (

    <Render data={data} onSetFilter={onSetFilter} />
  );
});

const Render = ({ data, onSetFilter }) => {
  const [isUlVisible, setIsUlVisible] = useState({
    loaihientrang: false,
    provinces: false,
    redbook: false,
    iucn: false,
  });

  const toggleUlVisibility = (ulName) => {
    setIsUlVisible((prevState) => ({
      ...prevState,
      [ulName]: !prevState[ulName],
    }));
  };

  console.log("render");

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
        {/* Hiện trạng loài */}
        <ul className="ulSideBar">
          <p onClick={() => toggleUlVisibility("loaihientrang")}>
            {isUlVisible.loaihientrang ? (
              <AiOutlineArrowDown />
            ) : (
              <AiOutlineArrowRight />
            )}
            Hiện trạng loài
          </p>
          {isUlVisible.loaihientrang &&
            data.length > 0 &&
            data[0].map((item) => (
              <label
                key={`loaihientrang-${item.id}`}
                htmlFor={`loaihientrang-${item.id}`}
              >
                <li>
                  <input
                    id={`loaihientrang-${item.id}`}
                    type="checkbox"
                    value={item.id}
                    onChange={onSetFilter("loaihientrang_ids[]")}
                  />
                  {item.ten}
                </li>
              </label>
            ))}
        </ul>
        {/* Địa giới hành chính */}
        <ul className="ulSideBar">
          <p onClick={() => toggleUlVisibility("provinces")}>
            {isUlVisible.provinces ? (
              <AiOutlineArrowDown />
            ) : (
              <AiOutlineArrowRight />
            )}
            Địa giới hành chính
          </p>
          {isUlVisible.provinces &&
            data.length > 0 &&
            data[1].map((item) => (
              <label
                key={`provinces-${item.id}`}
                htmlFor={`provinces-${item.id}`}
              >
                <li>
                  <input
                    type="checkbox"
                    id={`provinces-${item.id}`}
                    value={item.id}
                    onChange={onSetFilter("province_ids[]")}
                  />
                  {item.ten}
                </li>
              </label>
            ))}
        </ul>
        {/* Sách đỏ */}
        <ul className="ulSideBar">
          <p onClick={() => toggleUlVisibility("redbook")}>
            {isUlVisible.redbook ? (
              <AiOutlineArrowDown />
            ) : (
              <AiOutlineArrowRight />
            )}
            Sách đỏ
          </p>
          {isUlVisible.redbook &&
            data.length > 0 &&
            data[2].map((item) => (
              <label key={`redbook-${item.id}`} htmlFor={`redbook-${item.id}`}>
                <li>
                  <input
                    type="checkbox"
                    id={`redbook-${item.id}`}
                    value={item.id}
                    onChange={onSetFilter("sach_do_ids[]")}
                  />
                  {item.ma_danh_muc} - {item.ten}
                </li>
              </label>
            ))}
        </ul>
        {/* IUCN */}
        <ul className="ulSideBar">
          <p onClick={() => toggleUlVisibility("iucn")}>
            {isUlVisible.iucn ? (
              <AiOutlineArrowDown />
            ) : (
              <AiOutlineArrowRight />
            )}
            IUCN
          </p>
          {isUlVisible.iucn &&
            data.length > 0 &&
            data[3].map((item) => (
              <label key={`iucn-${item.id}`} htmlFor={`iucn-${item.id}`}>
                <li>
                  <input
                    id={`iucn-${item.id}`}
                    type="checkbox"
                    value={item.id}
                    onChange={onSetFilter("iucn_ids[]")}
                  />
                  {item.ma_danh_muc} - {item.ten}
                </li>
              </label>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Render;
