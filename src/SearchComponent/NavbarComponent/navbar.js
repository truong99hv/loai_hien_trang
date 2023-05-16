import "./navbar.css";
import { BsFillGrid3X3GapFill, BsMap, BsBarChartLine } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
function RenderNavBar({ onClick, active }) {
  function checkActive(param) {
    if (param === active) {
      return "navbarButtonActive";
    }
  }
  console.log(active);

  return (
    <>
      <div className="navbar">
        <button
          className={"navbarButton " + checkActive(0)}
          onClick={() => onClick(0)}
        >
          <BsFillGrid3X3GapFill />
          <span className="navbarButtonText">LƯỚI</span>
        </button>
        <button className={"navbarButton " + checkActive(1)} 
        onClick={() => onClick(1)}
        >
          <FaBars />
          <span className="navbarButtonText">BẢNG</span>
        </button>
        <button className="navbarButton">
          <BsMap />
          <span className="navbarButtonText">BẢN ĐỒ</span>
        </button>
        <button className="navbarButton">
          <BsBarChartLine />
          <span className="navbarButtonText">THỐNG KÊ</span>
        </button>
      </div>
    </>
  );
}
export default RenderNavBar;
