import "./navbar.css";
import {BsFillGrid3X3GapFill, BsMap, BsBarChartLine} from "react-icons/bs";
import {FaBars} from "react-icons/fa";
function RenderNavBar(){
    return (<>
        <div className="navbar">
            <button className="navbarButton navbarButtonActive"><BsFillGrid3X3GapFill/><span className="navbarButtonText">LƯỚI</span></button>
            <button className="navbarButton"><FaBars/><span className="navbarButtonText">BẢNG</span></button>
            <button className="navbarButton"><BsMap/><span className="navbarButtonText">BẢN ĐỒ</span></button>
            <button className="navbarButton"><BsBarChartLine/><span className="navbarButtonText">THỐNG KÊ</span></button>
        </div>
        </>
    )
}

export default RenderNavBar;