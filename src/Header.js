import { GrSearch } from 'react-icons/gr';
function TopHeader() {
    return (
        <div className="topHeader">
            <button className="loginButton"><span>Đăng nhập</span></button>
        </div>
    )
}
function BottomHeader() {
    return (
        <div className="bottomHeader">
            <div className="leftHeader">
                <img src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png" alt="Logo" className="imgTop"></img>
            </div>
            <div className="middleContainer">
                    <div className="searchContainer">
                    <input type="text" placeholder="Tìm kiếm"></input>
                    <button><GrSearch/></button>
                    </div>
                    <a><span>Nâng cao</span></a>
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
    )
}

export { TopHeader, BottomHeader };