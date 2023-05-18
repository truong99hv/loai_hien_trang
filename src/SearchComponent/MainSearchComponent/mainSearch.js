import "./mainSearch.css";
import RenderNavBar from "../NavbarComponent/navbar";
import RenderSideBar from "../SidebarComponent/sidebar";
import { useEffect, useState } from "react";
import GridView from "./gridView";
import TableView from "./tableView";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import getRoute from "../../DataHandle/router";
import { debounce } from "lodash";
function MainSearch() {
  return (
    <>
      <MainContainer />
    </>
  );
}

function MainContainer(){
  const [tab, setTab] = useState(0);

  const onSetTab = (tab) => {
    setTab(tab);
  };
  return (
    <>
      <RenderNavBar onClick={onSetTab} active={tab} />
      <RenderSideBarFunction tab={tab} />
    </>
  );
}

function RenderSideBarFunction({ tab }) {
  const [filterList, setFilterList] = useState({
    "loaihientrang_ids[]": [],
    "province_ids[]": [],
    "sach_do_ids[]": [],
    "iucn_ids[]": [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFilter, setDataFilter] = useState("");
  const debouncedSetDataFilter = debounce((filter) => {
    console.log("Debounced callback - dataFilter:", filter); // Thêm console.log ở đây
    setDataFilter(filter);
    setCurrentPage(1);
  }, 2000); // Thời gian chờ debounce (ms)

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
    debouncedSetDataFilter.cancel();
    const dataFilter = convertObject(filterList);
    debouncedSetDataFilter(dataFilter);
    setCurrentPage(1);
  }, [filterList]);
  return (
    <>
      <RenderSideBar onSetFilter={onSetFilter}/>
      <GetData tab={tab} dataFilter={dataFilter} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}
function GetData({ tab, currentPage, setCurrentPage, dataFilter }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [displayItems, setDisplayItems] = useState(18);
  const [loading, setLoading] = useState(true);
  // const [dataFilter, setDataFilter] = useState("");
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // setDataFilter(convertObject(filterList));
        const Data = await getDataFromApi(currentPage, dataFilter);
        const count = Data.pagination.total;
        setLoading(false);
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
          
                  // setData([...data, ...newData]);
                  if(currentPage===1){
                    setData(() => [...newData]);
                  }
                  else{
                    setData((prevData) => [...prevData, ...newData]);
                  }
                  
                  // setData((prevData) => [...newData]);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    fetchData();
  }, [currentPage, dataFilter]);

  const onsetPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    setDisplayItems(displayItems + 18);
  };
  let content = null;

  switch (tab) {
    case 0:
      content = <GridView items={data} total={total} onsetPage={onsetPage} currentPage={currentPage}  />;
      break;
    case 1:
      content = <TableView items={data} />;
      break;
    default:
      break;
  }
  if(loading){
    return <div className="container loading"></div>;
  }
  else {
  return (
    <div className="main">
      {content}
    </div>
  );
  }
}

function convertObject(object) {
  let result = [];
  for (let key in object) {
    object[key].forEach((item) => {
      result.push(`&${key}=${item}`);
    });
  }
  return result.join("");
}


export default MainSearch;
