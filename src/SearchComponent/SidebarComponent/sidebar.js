import "./sidebar.css";
import { AiFillQuestionCircle } from "react-icons/ai";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import { useEffect, useState } from "react";
function RenderSideBar({ onSetFilter }) {
  const [loaihientrang, setLoaihientrang] = useState([]);
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
        Loại
        {console.log(1)}
        <AiFillQuestionCircle />
        <ul>
          <p>Hiện trạng loài</p>
          {loaihientrang.length > 0 &&
            loaihientrang.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={onSetFilter("loaihientrang_ids[]")}
                />
                {item.ten}
              </li>
            ))}
        </ul>
        <ul>
          <p>Sách đỏ</p>
          {redbook.length > 0 &&
            redbook.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={onSetFilter("sach_do_ids[]")}
                />
                {item.ma_danh_muc} - {item.ten}
              </li>
            ))}
        </ul>
        <ul>
          <p>IUCN</p>
          {iucn.length > 0 &&
            iucn.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={onSetFilter("iucn_ids[]")}
                />
                {item.ma_danh_muc} - {item.ten}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default RenderSideBar;
