import { DatePicker, Input, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import "./user.css";
import { RiSearchLine } from "react-icons/ri";
import axios from "axios";

const Filter = ({ setFilterData }) => {
  // search
  const [search, setSearch] = useState("");
  // filter theo inactive
  const [inActive, setInAtive] = useState("");
  //  filter theo role
  const [filRole, setFilrole] = useState("");
  // sortby
  const [sortBy, setSortBy] = useState("");
  // date start
  const [dateStart, setDateStart] = useState("");
  // date end
  const [dateEnd, setDateEnd] = useState("");
  // let url = "http://wlp.howizbiz.com/api/users";
  // let pageParam = `?paginate=true&page=${currentPage}&perpage=${pageSize}`;
  // let urlUser =
  //   url +
  //   pageParam +
  //   `&with=roles,createdBy,provinces&search=${search}${
  //     inActive && inActive !== "" ? inActive : ""
  //   }${filRole && filRole !== "" ? filRole : ""}${
  //     sortBy && sortBy !== "" ? sortBy : ""
  //   }${dateStart && dateStart !== "" ? dateStart : ""}${
  //     dateEnd && dateEnd !== "" ? dateEnd : ""
  //   }`;

  useEffect(() => {
    const data = {
      search,
      inActive,
      filRole,
      sortBy,
      dateStart,
      dateEnd,
    };
    // Gọi hàm setFilterData để cập nhật dữ liệu trong UserManagement
    setFilterData(data);
  }, [search, inActive, filRole, sortBy, dateStart, dateEnd]);

  return (
    <>
      <div className="search">
        <Input
          size="large"
          className="input-search-bar"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          prefix={<RiSearchLine />}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="filter-table">
        <div className="">
          <Select
            placeholder="Trạng thái"
            size="large"
            style={{
              width: 250,
            }}
            allowClear
            options={[
              {
                label: "Toàn bộ",
              },
              {
                value: "false",
                label: "Hoạt động",
              },
              {
                value: "true",
                label: "Vô hiệu",
              },
            ]}
            onChange={(value) => {
              if (value !== null && value !== undefined) {
                setInAtive(
                  value === "false" ? "&inactive=false" : "&inactive=true"
                );
              } else {
                setInAtive(""); // Xóa giá trị trạng thái nếu không có giá trị được chọn
              }
            }}
          />
        </div>
        <div className="permission-select">
          <Select
            placeholder="Quyền"
            size="large"
            style={{
              width: 250,
            }}
            allowClear
            options={[
              {
                value: "&role_id=1",
                label: "Quản trị hệ thống",
              },
              {
                value: "&role_id=2",
                label: "Ban quản lý dự án",
              },
              {
                value: "&role_id=3",
                label: "Cơ quan chính phủ",
              },
              {
                value: "&role_id=4",
                label: "Chính quyền địa phương",
              },
              {
                value: "&role_id=5",
                label: "Ban quản lý VQG/KBT và các bên liên quan",
              },
            ]}
            onChange={(value) => setFilrole(value)}
          />
        </div>
        <div className="date-start">
          <DatePicker
            style={{
              width: 250,
            }}
            placeholder="Ngày bắt đầu"
            size="large"
            format="DD/MM/YYYY"
            onChange={(date, dateString) =>
              setDateStart(
                date ? `&date_start=${dateString.split("/").join("%2F")}` : ""
              )
            }
          />
        </div>
        <div className="date-end">
          <DatePicker
            style={{
              width: 250,
            }}
            placeholder="Ngày kết thúc"
            size="large"
            format="DD/MM/YYYY"
            onChange={(date, dateString) =>
              setDateEnd(
                date ? `&date_end=${dateString.split("/").join("%2F")}` : ""
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default memo(Filter);
