import "./sidebar.css";
import { AiFillQuestionCircle } from "react-icons/ai";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import { useEffect, useState } from "react";
function RenderSideBar({ onSetFilter }) {
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
        console.log(newiucnList);
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
        {console.log(1)}
        <AiFillQuestionCircle style={{
          fontSize: "18px",
          marginLeft: "10px",
        }} />
        <hr className="hrSideBar"/>
        <ul className="ulSideBar">
          <p>Hiện trạng loài</p>
          {loaihientrang.length > 0 &&
            loaihientrang.map((item) => ( 
                <label  key={item.id} htmlFor={`loaihientrang-${item.id}`}>
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
                <label key={item.id} htmlFor={`provinces-${item.id}`}>
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
                <label  key={item.id} htmlFor={`redbook-${item.id}`}>
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
              <label  htmlFor={`iucn-${item.id}`}>
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
}

export default RenderSideBar;
