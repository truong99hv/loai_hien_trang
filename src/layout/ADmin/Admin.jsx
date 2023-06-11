import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { GiAnimalSkull } from "react-icons/gi";
import { FaListAlt } from "react-icons/fa";
import { BsJournal, BsJournalMinus, BsJournalPlus } from "react-icons/bs";
import { AiOutlineGroup } from "react-icons/ai";
import { Layout, Menu, Button, theme, Popover } from "antd";
import { Link } from "react-router-dom";
import "./admin.css";
import {
  RiDashboardFill,
  RiPencilFill,
  RiSortDesc,
  RiUserFill,
} from "react-icons/ri";
import ContentPopover from "./ContentPopover";
import UserManagement from "./UserManagement/UserManagement";
import Dashboard from "./Dashbord/Dashboard";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };

  const [selectedMenu, setSelectedMenu] = useState("1");

  const handleMenuClick = (menuKey) => {
    setSelectedMenu(menuKey);
  };

  const items = [
    getItem(" Bảng điều khiển ", "1", <RiDashboardFill />),
    getItem(" Quản lý người dùng ", "2", <RiUserFill />),
    getItem("  Phân loại học  ", "3", <RiSortDesc />),
    getItem("  Loài nguy cấp quý hiếm  ", "4", <GiAnimalSkull />),
    getItem("  Bài viết  ", "5", <RiPencilFill />),
    getItem(" Phiếu đề xuất ", "Phiếu đề xuất", <FaListAlt />, [
      getItem(" Đưa loài vào ", "6", <BsJournalPlus />),
      getItem(" Đưa loài ra ", "7", <BsJournalMinus />),
      getItem(" Phiếu thông tin ", "8", <BsJournal />),
    ]),
    getItem(" Danh mục ", " Danh mục ", <AiOutlineGroup />, [
      getItem(" Danh mục tĩnh ", "9", <BsJournalPlus />),
      getItem(" Danh mục động ", "10", <BsJournalMinus />),
    ]),
  ];

  return (
    // <>
    //   <div>{user.name}</div>
    //   <button onClick={handleLogout}>Logout</button>
    // </>
    <Layout>
      <Header className="header">
        <div className="left-header">
          <Button
            className="btn btn-menu"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 50,
              height: 50,
            }}
          />
          <Link href="/" className="link-logo">
            <img src="http://wlp.howizbiz.com/static/img/logo.png" alt="logo" />
          </Link>
          <h3 className="title-header">
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h3>
        </div>

        <div className="right-header">
          <Popover
            placement="bottom"
            content={<ContentPopover />}
            trigger="click"
          >
            <Button className="btn btn-user">
              <div className="avatar-user">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="user.name" />
                ) : (
                  <span>
                    {user.name.split("").splice(0, 1)[0].toUpperCase()}
                  </span>
                )}
              </div>
              <span className="name-user">{user.name}</span>
            </Button>
          </Popover>
        </div>
      </Header>
      <Layout>
        <Sider
          className="sidebar"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
        >
          {/* <div className="demo-logo-vertical" /> */}
          <Menu
            className="menu-items"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={({ key }) => handleMenuClick(key)}
          />
        </Sider>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* <UserManagement /> */}
          {selectedMenu === "1" && <Dashboard />}
          {selectedMenu === "2" && <UserManagement />}
          {/* {selectedMenu === "3" && <Classification />}
          {selectedMenu === "4" && <RareSpecies />}
          {selectedMenu === "5" && <Articles />}
          {selectedMenu === "6" && <ProposalForm />}
          {selectedMenu === "9" && <Category />} */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
