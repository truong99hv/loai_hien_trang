import "./mainSearch.css";
import RenderNavBar from "../NavbarComponent/navbar";
import RenderSideBar from "../SidebarComponent/sidebar";
import { useEffect, useState } from "react";
import GridView from "./gridView";
import TableView from "./tableView";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import getRoute from "../../router";
function MainSearch() {
  return (
    <>
      <GetData />
    </>
  );
}

function GetData() {
  let [tab, setTab] = useState(0);
  let [data, setData] = useState([]);
  let [total, setTotal] = useState(0);
  let [displayItems, setDisplayItems] = useState(18);
  let [currentPage, setCurrentPage] = useState(1); //
  let onSetTab = (tab) => setTab(tab);
  let onsetPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    setDisplayItems(displayItems + 18);
    console.log(displayItems);
  } //
  let content = null;

  useEffect(() => {
    const returnData = async () => {
      try {
        const Data = await getDataFromApi(currentPage);
        const count = Data.pagination.total;
        setTotal(count);
        const newData = [];
        Data.list.forEach((item) => {
          let loai_hien_trang = null;
          let sach_dos = null;
          let iucns = null;
          let images = getRoute("domain") + "/static/img/image4.5aecb9b5.png";

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
            images = getRoute("domain") + item.attachments[0].path;
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
        console.log(newData);
        // setData([...data, ...newData]);
        setData(prevData => [...prevData, ...newData]);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    returnData();
  }, [currentPage]);

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
    <>
      <RenderNavBar onClick={onSetTab} active={tab} />
      <RenderSideBar />
      <div className="main">
        <h2 className="total">
          <b>Kết quả: ({total})</b>
        </h2>
        {content}
        {displayItems < total &&
          <div className="buttonLoadMore">
            <a href="/" onClick={(e) => onsetPage(e)}>Tải thêm</a>
          </div>
        }
      </div>
    </>
  );
}
export default MainSearch;
