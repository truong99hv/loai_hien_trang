import "./mainSearch.css";
import RenderNavBar from "../NavbarComponent/navbar";
import RenderSideBar from "../SidebarComponent/sidebar";
import { useEffect, useState } from "react";
import GridView from "./gridView";
import TableView from "./tableView";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import getRoute from "../../DataHandle/router";
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
    "iucn_ids": [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFilter, setDataFilter] = useState("");
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
    const dataFilter = convertObject(filterList);
    setDataFilter(dataFilter);
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
  // const [dataFilter, setDataFilter] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setDataFilter(convertObject(filterList));
        const Data = await getDataFromApi(currentPage, dataFilter);
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

  return (
    <div className="main">
      {content}

    </div>
  );
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

// function GetData() {
//   let [tab, setTab] = useState(0);
//   let [data, setData] = useState([]);
//   let [total, setTotal] = useState(0);
//   let [displayItems, setDisplayItems] = useState(18);
//   let [currentPage, setCurrentPage] = useState(1); //
//   let [filterList, setFilterList] = useState({
//     "loaihientrang_ids[]": [],
//     "province_ids[]": [],
//     "sach_do_ids[]": [],
//     iucn_ids: [],
//   });
//   let [dataFilter, setDataFilter] = useState("");
//   let onSetTab = (tab) => setTab(tab);
//   let onsetPage = (e) => {
//     e.preventDefault();
//     setCurrentPage(currentPage + 1);
//     setDisplayItems(displayItems + 18);
//   }; //
//   let onSetFilter = (control) => (e) => {
//     const isChecked = e.target.checked;
//     const value = e.target.value;
//     if (isChecked) {
//       setFilterList((prevFilterList) => ({
//         ...prevFilterList,
//         [control]: [...prevFilterList[control], value],
//       }));
//     } else {
//       setFilterList((prevFilterList) => ({
//         ...prevFilterList,
//         [control]: prevFilterList[control].filter((item) => item !== value),
//       }));
//     }
//   };
//   let content = null;

//   useEffect(() => {
//     setDataFilter(convertObject(filterList));
//     const returnData = async () => {
//       try {
//         const Data = await getDataFromApi(currentPage, dataFilter);
//         const count = Data.pagination.total;
//         setTotal(count);
//         const newData = [];
//         Data.list.forEach((item) => {
//           let loai_hien_trang = null;
//           let sach_dos = null;
//           let iucns = null;
//           let images = getRoute("domain") + "/static/img/image4.5aecb9b5.png";

//           if (item.loai_hien_trang) {
//             loai_hien_trang = item.loai_hien_trang.ten;
//           }
//           if (item.sach_dos.length > 0) {
//             sach_dos = item.sach_dos[0].ma_danh_muc;
//           }
//           if (item.iucns.length > 0) {
//             iucns = item.iucns[0].ma_danh_muc;
//           }
//           if (item.attachments.length > 0) {
//             images = getRoute("domain") + item.attachments[0].path;
//           }
//           newData.push({
//             name: item.ten,
//             ten_khoa_hoc: item.ten_khoa_hoc,
//             images: images,
//             kingdom: item.kingdom.ten,
//             phylumn: item.phylumn.ten,
//             loai_hien_trang: loai_hien_trang,
//             sach_dos: sach_dos,
//             iucns: iucns,
//           });
//         });

//         // setData([...data, ...newData]);

//         // setData((prevData) => [...prevData, ...newData]);
//         setData((prevData) => [...newData]);
//       } catch (error) {
//         console.log("ERROR: " + error);
//       }
//     };
//     returnData();
//     console.log(filterList);
//   }, [currentPage, filterList, dataFilter]);

//   switch (tab) {
//     case 0:
//       content = <GridView items={data} total = {total} />;
//       break;
//     case 1:
//       content = <TableView items={data} />;
//       break;
//     default:
//   }
//   return (
//     <>
//       <RenderNavBar onClick={onSetTab} active={tab} />
//       <RenderSideBar onSetFilter={onSetFilter} />
//       <div className="main">

//         {content}
//         {displayItems < total && (
//           <div className="buttonLoadMore">
//             <a href="/" onClick={(e) => onsetPage(e)}>
//               Tải thêm
//             </a>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// function convertObject(object) {
//   let result = [];
//   for (let key in object) {
//     object[key].forEach((item) => {
//       result.push(`&${key}=${item}`)
//       // result = "&" + result + key  + "="+ item;
//     });
//   }
//   return result.join("");;
// }

export default MainSearch;
