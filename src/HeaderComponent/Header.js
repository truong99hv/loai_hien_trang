    import { GrSearch } from 'react-icons/gr';
    import {FaBars} from 'react-icons/fa'
    import "./Header.css";
    function Header() {
        return (
            <div className='header'>
            <div className="topHeader">
                <button className="loginButton"><span>Đăng nhập</span></button>
            </div>
            <div className="bottomHeader">
                <div className="leftHeader">
                    <img src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png" alt="Logo" className="imgTop"></img>
                </div>
                <div className="middleContainer">
                        <div className="searchContainer">
                        <input type="text" placeholder="Tìm kiếm"></input>
                        <button className='searchBox'><GrSearch/></button>
                        <a><span>Nâng cao</span></a>
                        </div>
                        <button className='dropdownMenu'><FaBars/></button>
                        
                    </div>
                <div className="rightHeader">
                    <a href="/bangtin"><span>Bản tin</span>
                    </a>
                    <a href="/gioithieu"><span>Giới thiệu</span>
                    </a>
                    <a href="tailieu"><span>Tài liệu</span>
                    </a>
                    <a className="yellowButton" href="lienhe"><span>Liên hệ</span>
                    </a>
                </div>
            </div>
            </div>
        )
    }

    export default Header;