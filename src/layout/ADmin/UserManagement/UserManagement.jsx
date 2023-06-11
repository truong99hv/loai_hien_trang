import {
  Button,
  Input,
  Popconfirm,
  Popover,
  Select,
  Switch,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { RiSearchLine, RiUserFill } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import getData from "../asset/getData";
import "./user.css";
import ModalAddNew from "./ModalAddNew";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import { RiRotateLockFill } from "react-icons/ri";
import Search from "antd/es/transfer/search";

const UserManagement = () => {
  const [userData, setUserData] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    pageSizeOptions: ["5", "10", "15", "20"],
    total: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const token = localStorage.getItem("user-token");

  const getUser = async () => {
    const url =
      "http://wlp.howizbiz.com/api/users?paginate=true&page=1&perpage=10&with=roles";
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer",
    };
    try {
      const listUserData = await getData(url, headers);
      if (listUserData) {
        setUserData(listUserData.list);
        setTotalUser(listUserData.pagination.count);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: listUserData.pagination.count,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformData = (data) => {
    return data.map((item, index) => ({
      key: index,
      name: item.name,
      username: item.username,
      mobile: item.mobile,
      inactive: item.inactive,
      created_at: item.created_at,
      roles: item.roles,
      id: item.id,
    }));
  };

  useEffect(() => {
    getUser();
  }, []);

  const updateUser = async (user_id, userData) => {
    const url = `http://wlp.howizbiz.com/api/users/${user_id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.put(url, userData, { headers });
    } catch (error) {
      throw new Error("Failed to update user");
    }
  };

  const handleUpdateUser = async (values, username) => {
    try {
      const { name, email, mobile, role_ids } = values;
      console.log("Các giá trị cần cập nhật:", values);
      const userData = {
        name,
        email,
        mobile,
        role_ids,
      };
      await updateUser(selectedUserId, userData);
      setIsModalVisible(false);
      message.success(`Cập nhật thông tin người dùng "${username}" thành công`);
      getUser();
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi khi cập nhật thông tin người dùng");
    }
  };

  const handleEditClick = (userId, record) => {
    console.log(record);
    setCurrentUser(record);
    setSelectedUser(record);
    setIsModalVisible(true);
    setIsUpdate(true);
    setSelectedUserId(userId);
  };
  const newData = userData ? transformData(userData) : [];

  const isRoleAdminProjectManager = (roles) => {
    return roles.some(
      (role) => role.name.toLowerCase() === "ban quản lý dự án"
    );
  };
  const areAllRolesDisabled = (roles) => {
    const disabledRoles = ["Quản Trị Hệ Thống"];
    const roleNames = roles.map((role) => role.name.toLowerCase());
    return disabledRoles.every((disabledRole) =>
      roleNames.includes(disabledRole.toLowerCase())
    );
  };

  const columns = [
    {
      title: "Tên hiển thị",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile",
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "inactive",
      width: 120,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (inactive) => (
        <Switch
          checked={!inactive}
          onChange={() => handleSwitchChange(inactive)}
        />
      ),
    },
    {
      title: "Quyền",
      dataIndex: "roles",
      render: (roles) => {
        if (roles && roles.length > 0) {
          return (
            <div className="list-roles">
              {roles.map((role) => (
                <span
                  className="role"
                  key={role.id}
                  style={{ backgroundColor: role.meta.color }}
                >
                  {role.name}
                </span>
              ))}
            </div>
          );
        }
        return "-";
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",

      render: (text) => {
        const shortenedText = text.substring(0, 10);
        return shortenedText;
      },
    },

    {
      title: "Hành động",
      width: 120,
      render: (_, record) => {
        const roles = record.roles;
        const disableDelete = isRoleAdminProjectManager(roles);
        const confirm = (e) => {
          deleteUser(record.id, record.username);
        };
        const cancel = (e) => {
          message.error("Click on No");
        };

        return (
          <span>
            <Popover content="Đổi mật khẩu" placement="bottom">
              <RiRotateLockFill
                className={`action action-password ${
                  areAllRolesDisabled(roles) ? "button-disabled" : ""
                }`}
                disabled={areAllRolesDisabled(roles)}
              />
            </Popover>
            <Popover content="Cập nhật" placement="bottom">
              <BsPencilFill
                className={`action bg-red action-update ${
                  areAllRolesDisabled(roles) ? "button-disabled" : ""
                }`}
                disabled={areAllRolesDisabled(roles)}
                onClick={() => handleEditClick(record.id, record)}
              />
            </Popover>
            <Popover content="Xóa" placement="bottom">
              <Popconfirm
                title="Bạn có chắc chắn không?"
                description="Bạn có chắc muốn xóa . Điều này hoàn toàn không thế hoàn tác!"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Áp dụng"
                cancelText="Không"
              >
                <MdDeleteOutline
                  className={`action bg-red action-delete ${
                    disableDelete || areAllRolesDisabled(roles)
                      ? "button-disabled"
                      : ""
                  }`}
                  disabled={disableDelete || areAllRolesDisabled(roles)}
                />
              </Popconfirm>
            </Popover>
          </span>
        );
      },
    },
  ];

  const handleSwitchChange = (inactive) => {
    // const updatedUserData = userData.map((user) => {
    //   if (user.inactive === !inactive) {
    //     return {
    //       ...user,
    //       inactive: true,
    //     };
    //   }
    //   return user;
    // });
    // setUserData(updatedUserData);
  };

  const handlePageSizeChange = (value) => {
    const pageSize = parseInt(value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: 1,
      pageSize: pageSize,
    }));
  };

  const TableSummary = ({
    startIndex,
    endIndex,
    totalUser,
    pageSizeOptions,
    handlePageSizeChange,
  }) => {
    return (
      <>
        <div className="page-total-page">
          {startIndex + 1} - {endIndex} / {totalUser}
        </div>
        <Select
          className="select-page"
          value={pagination.pageSize.toString()}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((pageSize) => (
            <Select.Option key={pageSize} value={pageSize}>
              {pageSize} / trang
            </Select.Option>
          ))}
        </Select>
      </>
    );
  };

  const deleteUser = async (user_id, username) => {
    const url = `http://wlp.howizbiz.com/api/users/${user_id}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.delete(url, { headers });
      getUser();
      message.success(`Xóa thông tin người dùng "${username}" thành công`);
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi khi xóa thông tin người dùng");
    }
  };

  // search
  const handleSearch = async (value) => {
    setSearchValue(value);
    const url = `http://wlp.howizbiz.com/api/users?paginate=true&page=1&perpage=10&with=roles,createdBy,provinces&search=${value}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const listUserData = await axios.get(url, { headers });
      // const listUserData = await getData(url, headers);
      console.log(listUserData);
      if (listUserData) {
        setSearchResults(listUserData.data.list);
        setTotalUser(listUserData.data.pagination.count);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: listUserData.data.pagination.count,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);
  const dataSource = searchValue ? searchResults : newData;

  return (
    <div className="user-management">
      <div className="title-user-management">
        <div className="avatar-user-management">
          <RiUserFill />
        </div>
        <h3>Danh sách người dùng</h3>
      </div>

      <div className="search-bar">
        <Input
          size="large"
          className="input-search-bar"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          prefix={<RiSearchLine />}
          // onSearch={(value) => handleSearch(value)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          className="btn btn-add-new"
          size="large"
          type="primary"
          icon={<BiPlus />}
          danger
          onClick={() => {
            setIsModalVisible(true);
            setIsUpdate(false);
          }}
        >
          Thêm mới
        </Button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        summary={(pageData) => (
          <TableSummary
            startIndex={(pagination.current - 1) * pagination.pageSize}
            endIndex={Math.min(
              (pagination.current - 1) * pagination.pageSize +
                pagination.pageSize,
              totalUser
            )}
            totalUser={totalUser}
            pageSizeOptions={pagination.pageSizeOptions}
            handlePageSizeChange={handlePageSizeChange}
          />
        )}
      />
      <ModalAddNew
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        resetData={getUser}
        // selectUser={selectedUser}
        isUpdate={isUpdate}
        initialValues={currentUser}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UserManagement;
