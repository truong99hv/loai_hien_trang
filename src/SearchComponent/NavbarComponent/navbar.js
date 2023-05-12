import "./navbar.css";
import {BsFillGrid3X3GapFill, BsMap, BsBarChartLine} from "react-icons/bs";
import {FaBars} from "react-icons/fa";
function RenderNavBar(onclick){
    return (<>
        <div className="navbar">
            <button className="navbarButton navbarButtonActive" onclick={onclick(0)}><BsFillGrid3X3GapFill/><span className="navbarButtonText">LƯỚI</span></button>
            <button className="navbarButton" onclick={onclick(1)}><FaBars/><span className="navbarButtonText">BẢNG</span></button>
            <button className="navbarButton"><BsMap/><span className="navbarButtonText">BẢN ĐỒ</span></button>
            <button className="navbarButton"><BsBarChartLine/><span className="navbarButtonText">THỐNG KÊ</span></button>
        </div>
        </>
    )
}

export default RenderNavBar;