import "./mainSearch.css";
import RenderNavBar from "../NavbarComponent/navbar";
import RenderSideBar from "../SidebarComponent/sidebar";
// import getRoute from "../../router";
import { useEffect, useState } from "react";
import GridView from "./gridView";
import TableView from "./tableView"
import getDataFromApi from "../../DataHandle/getDataFromApi";
function MainSearch() {
  return (
    <>
      <GetData/>
    </>
  );
}

function GetData() {
  let [tab, setTab] = useState(0);
  let [data, setData] = useState([]);
  let onSetTab = (tab) => setTab(tab);
  let content = null;
  useEffect(() => {
    const returnData = async() => {
      try {
        const Data = await getDataFromApi("all");
        const data = Data.list;
        const newData = [];
        data.forEach((item) => {
          let loai_hien_trang = null;
          let sach_dos = null;
          let iucns = null;
          let images =  "/static/img/image4.5aecb9b5.png";
          if (item.loai_hien_trang) {
            loai_hien_trang = item.loai_hien_trang.ten;
          }
          if (item.sach_dos.length > 0) {
            sach_dos = item.sach_dos[0].ma_danh_muc;
          }
          if (item.iucns.length > 0) {
            iucns = item.iucns[0].ma_danh_muc;
          }
          if (item.attachments.length > 0) {
            images =  + item.attachments[0].path;
          }
          newData.push({
            name: item.ten,
            ten_khoa_hoc: item.ten_khoa_hoc,
            images: images,
            kingdom: item.kingdom.ten,
            phylumn: item.phylumn.ten,
            loai_hien_trang: loai_hien_trang,
            sach_dos: sach_dos,
            iucns: iucns,
          });
        });
        setData(newData);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    }
    returnData()
  }, []);
  
  switch (tab) {
    case 0:
      content = <GridView items={data} />;
      break;
    case 1:
      content = <TableView items={data} />;
      break;
      default:
  }
  return (
    <div>
     <div className="navbar">
            <button className="navbarButton navbarButtonActive" onClick={() => onSetTab(0)}><span className="navbarButtonText">LƯỚI</span></button>
            <button className="navbarButton" onClick={() => onSetTab(1)}><span className="navbarButtonText">BẢNG</span></button>
            <button className="navbarButton"><span className="navbarButtonText">BẢN ĐỒ</span></button>
            <button className="navbarButton"><span className="navbarButtonText">THỐNG KÊ</span></button>
        </div>
      <div className="main">{content}</div>
      <RenderSideBar />
    </div>
  );
}
export default MainSearch;
