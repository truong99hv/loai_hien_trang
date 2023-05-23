import "./sidebar.css";
import { AiFillQuestionCircle } from "react-icons/ai";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import React, {  useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataHandle/DataContext";
const RenderSideBar = React.memo(({ onSetFilter }) =>{
  const [loaihientrang, setLoaihientrang] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [redbook, setRedbook] = useState([]);
  const [iucn, setIucn] = useState([]);
  

  useEffect(() => {
    const returnData = async () => {
      try {
        const loaihientrangList = await getDataFromApi("loaihientrang");
        const newLoaihientrang = [];
        loaihientrangList.forEach((item) => {
          newLoaihientrang.push({
            id: item.id,
            ten: item.ten,
          });
        });
        setLoaihientrang(newLoaihientrang);

        const provincesList = await getDataFromApi("provinces");
        const newProvinces = [];
        provincesList.forEach((item)=>{
          newProvinces.push({
            id:item.id,
            ten:item.name,
          })
        })
        setProvinces(newProvinces);

        const redbookList = await getDataFromApi("redbook");
        const newRedbook = [];
        redbookList[0].childs.forEach((item) => {
          newRedbook.push({
            id: item.id,
            ten: item.ten,
            ma_danh_muc: item.ma_danh_muc,
          });
        });
        setRedbook(newRedbook);

        const iucnList = await getDataFromApi("iucn");
        const newiucnList = [];
        iucnList[0].childs.forEach((item) => {
          newiucnList.push({
            id: item.id,
            ten: item.ten,
            ma_danh_muc: item.ma_danh_muc,
          });
        });
        setIucn(newiucnList);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    returnData();
  }, []);
  return (
    <>
      <div className="sidebarContainer">
      BỘ LỌC
        <AiFillQuestionCircle style={{
          fontSize: "18px",
          marginLeft: "10px",
        }} />
        <hr className="hrSideBar"/>
        <ul className="ulSideBar">
          <p>Hiện trạng loài</p>
          {console.log("render1")}
          {loaihientrang.length > 0 &&
            loaihientrang.map((item) => ( 
                <label  key={`loaihientrang-${item.id}`} htmlFor={`loaihientrang-${item.id}`}>
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
        <ul className="ulSideBar">
        <p>Địa giới hành chính</p>
        {provinces.length > 0 &&
            provinces.map((item) => (
                <label key={`provinces-${item.id}`} htmlFor={`provinces-${item.id}`}>
                  <li >
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
        <ul className="ulSideBar">
        <p>Sách đỏ</p>
        {redbook.length > 0 &&
            redbook.map((item) => (
                <label  key={`redbook-${item.id}`} htmlFor={`redbook-${item.id}`}>
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
        <ul className="ulSideBar">
          <p>IUCN</p>
          {iucn.length > 0 &&
            iucn.map((item) => (
              <label key = {`iucn-${item.id}`}  htmlFor={`iucn-${item.id}`}>
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
});

export const RenderSideBarFunction = () => {
  const [filterList, setFilterList] = useState({
    "loaihientrang_ids[]": [],
    "province_ids[]": [],
    "sach_do_ids[]": [],
    "iucn_ids[]": [],
    "search":[],
  });
  const { setCurrentPage, setDataFilter } = useContext(DataContext);

  const onSetFilter = (control) => (e) => {
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
    
  };

  useEffect(() => {
    const filter = convertObject(filterList);
    // setDataFilter(filter);
    setDataFilter((prevFilterList) => {
      if (prevFilterList.indexOf("&search")===-1) {
        return filter
      } else {
        return filter + prevFilterList.substring(prevFilterList.lastIndexOf("&search"));
      }
    });
    setCurrentPage(1);
  }, [filterList, setCurrentPage, setDataFilter]);

  return <RenderSideBar onSetFilter={onSetFilter} />;
};


function convertObject(object) {

  let result = [];
  for (let key in object) {
    object[key].forEach((item) => {
      result.push(`&${key}=${item}`);
    });
  }
  return result.join("");
}

