import "./mainSearch.css";
import RenderNavBar from "../NavbarComponent/navbar";
import RenderSideBar from "../SidebarComponent/sidebar";
// import getRoute from "../../router";
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
  let [currentPage, setCurrentPage] = useState(1);
  let [isInitialRender, setIsInitialRender] = useState(true); 
  let onSetTab = (tab) => setTab(tab);
  let onsetPage =() =>setCurrentPage(currentPage+1);
  let content = null;

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // Cập nhật biến flag
      return;
    }
    const returnData = async () => {
      try {
        const Data = await getDataFromApi(currentPage);
        // const data = Data.list;
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
        setData([...data, ...newData]);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    returnData();
  }, [currentPage, isInitialRender]);

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
      <RenderNavBar onClick={onSetTab} />
      <RenderSideBar />
      <div className="main">
        <h2 className="total">
          <b>Kết quả: ({total})</b>
        </h2>
        {content}

      <button onClick={onsetPage}>Load More </button>
      </div>
    </div>
  );
}
export default MainSearch;
