import "./sidebar.css";
import { AiFillQuestionCircle } from "react-icons/ai";
import getDataFromApi from "../../DataHandle/getDataFromApi";
import { useEffect, useState } from "react";
function RenderSideBar({onSetFilter}) {
  const [loaihientrang, setLoaihientrang] = useState([]);
  useEffect(() => {
    const returnData = async () => {
      try {
        const loaihientrang = await getDataFromApi("loaihientrang");
        const newloaihientrang = []
        loaihientrang.forEach((item) =>{
            newloaihientrang.push({
                id: item.id,
                ten:item.ten,
              });
        })
        setLoaihientrang(newloaihientrang);
        console.log(newloaihientrang)
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
        <AiFillQuestionCircle />
        <ul>
          <p>Hiện trạng loài</p>
          {loaihientrang.length>0 && loaihientrang.map((item) => (
            <li key={item.id}><input type="checkbox" value={item.id} onChange={onSetFilter("loaihientrang_ids[]")}/>{item.ten} </li>
        ))}
        </ul>
      </div>
    </>
  );
}

export default RenderSideBar;
