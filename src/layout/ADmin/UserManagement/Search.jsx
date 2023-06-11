import { Input } from "antd";
import React from "react";
import { RiSearchLine } from "react-icons/ri";
import "./user.css";

const Search = () => {
  return (
    <Input
      size="large"
      className="input-search-bar"
      //   placeholder="Tìm kiếm theo tên hoặc số điện thoại"
      placeholder="aaa"
      prefix={<RiSearchLine />}
    />
  );
};

export default Search;
