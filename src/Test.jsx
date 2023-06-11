import { Table } from "antd";
import { useState } from "react";

const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "Column 5",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Column 6",
    dataIndex: "address",
    key: "6",
    width: 150,
  },
  {
    title: "Column 7",
    dataIndex: "address",
    key: "7",
    width: 150,
  },
  {
    title: "Column 8",
    dataIndex: "address",
    key: "8",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    // render: () => <a>action</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const Test = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    pageSizeOptions: ["5", "10", "15", "20"],
    total: 0,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={pagination}
      onChange={handleTableChange}
      summary={(pageData) => {
        const { current, pageSize } = pagination;
        const startIndex = (current - 1) * pageSize;
        const endIndex = startIndex + pageData.length;
        const totalItems = data.length;
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              Total: {startIndex + 1} - {endIndex} of {totalItems} items
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
      defaultPageSize={5}
    />
  );
};

export default Test;
// import { Table } from "antd";
// import { useState } from "react";
// import "./test.css";

// const ExampleTable = () => {
//   const [data, setData] = useState([
//     { id: 1, name: "John", age: 25 },
//     { id: 2, name: "Alice", age: 30 },
//     { id: 3, name: "Bob", age: 28 },
//     { id: 4, name: "Catherine", age: 32 },
//     { id: 5, name: "David", age: 26 },
//     { id: 6, name: "Emily", age: 29 },
//     { id: 7, name: "Frank", age: 31 },
//     { id: 8, name: "Grace", age: 27 },
//     { id: 9, name: "Henry", age: 33 },
//     { id: 10, name: "Isabella", age: 24 },
//     { id: 11, name: "Jacob", age: 30 },
//     { id: 12, name: "Kate", age: 28 },
//     { id: 13, name: "Liam", age: 25 },
//     { id: 14, name: "Mia", age: 32 },
//     { id: 15, name: "Noah", age: 26 },
//     { id: 16, name: "Olivia", age: 29 },
//     { id: 17, name: "Patrick", age: 31 },
//     { id: 18, name: "Quinn", age: 27 },
//     { id: 19, name: "Ryan", age: 33 },
//     { id: 20, name: "Sophia", age: 24 },
//     { id: 21, name: "Thomas", age: 30 },
//     { id: 22, name: "Uma", age: 28 },
//     { id: 23, name: "Vincent", age: 25 },
//     { id: 24, name: "Wendy", age: 32 },
//     { id: 25, name: "Xander", age: 26 },
//     { id: 26, name: "Yara", age: 29 },
//     { id: 27, name: "Zachary", age: 31 },
//     { id: 28, name: "Amelia", age: 27 },
//     { id: 29, name: "Benjamin", age: 33 },
//     { id: 30, name: "Charlotte", age: 24 },
//   ]);

//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 5,
//     pageSizeOptions: ["5", "10", "15", "20"],
//     total: data.length,
//   });

//   const handleTableChange = (pagination, filters, sorter) => {
//     setPagination(pagination);
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//       sorter: (a, b) => a.age - b.age,
//     },
//   ];
//   return (
//     <Table
//       dataSource={data}
//       columns={columns}
//       pagination={pagination}
//       onChange={handleTableChange}
//     />
//   );
// };

// export default ExampleTable;
// const columns = [
//   {
//     title: "Tên hiển thị",
//     dataIndex: "name",
//     // key: "name",
//     sorter: (a, b) => a.name.localeCompare(b.name),
//     // with: 100,
//   },
//   {
//     title: "Tên đăng nhập",
//     dataIndex: "username",
//     // key: "username",
//     sorter: (a, b) => a.name.localeCompare(b.name),
//     width: 150,
//   },
//   {
//     title: "Số điện thoại",
//     dataIndex: "mobile",
//     // key: "mobile",
//     width: 120,
//   },
//   {
//     title: "Trạng thái",
//     dataIndex: "inactive",
//     // key: "email",
//     width: 120,
//     sorter: (a, b) => a.name.localeCompare(b.name),
//     render: (inactive) => (
//       <Switch
//         checked={!inactive}
//         onChange={() => handleSwitchChange(inactive)}
//       />
//     ),
//   },
//   {
//     title: "Quyền",
//     dataIndex: "roles",
//     // key: "roles",
//     render: (roles) => {
//       if (roles && roles.length > 0) {
//         return (
//           <div className="list-roles">
//             {roles.map((role) => (
//               <span
//                 className="role"
//                 key={role.id}
//                 style={{ backgroundColor: role.meta.color }}
//               >
//                 {role.name}
//               </span>
//             ))}
//           </div>
//         );
//       }
//       return "-";
//     },
//   },
//   {
//     title: "Ngày tạo",
//     dataIndex: "created_at",
//     // key: "created_at",

//     render: (text) => {
//       const shortenedText = text.substring(0, 10);
//       return shortenedText;
//     },
//   },

//   {
//     title: "Hành động",
//     render: (_, record) => {
//       const roles = record.roles;
//       const disableDelete = isRoleAdminProjectManager(roles);
//       // const disableAllActions = areAllRolesDisabled(roles);

//       return (
//         <span>
//           <Button
//             className={`action action-password ${
//               areAllRolesDisabled(roles) ? "button-disabled" : ""
//             }`}
//             disabled={areAllRolesDisabled(roles)}
//           >
//             Đổi mật khẩu
//           </Button>
//           <Button
//             className={`action action-update ${
//               areAllRolesDisabled(roles) ? "button-disabled" : ""
//             }`}
//             disabled={areAllRolesDisabled(roles)}
//           >
//             Cập nhật
//           </Button>
//           <Button
//             className={`action action-delete ${
//               disableDelete || areAllRolesDisabled(roles)
//                 ? "button-disabled"
//                 : ""
//             }`}
//             disabled={disableDelete || areAllRolesDisabled(roles)}
//             onClick={() => {
//               if (!disableDelete && !areAllRolesDisabled(roles)) {
//                 // Xử lý logic xóa tại đây
//               }
//             }}
//           >
//             Xóa
//           </Button>
//         </span>
//       );
//     },
//   },
// ];
const isRoleAdminProjectManager = (roles) => {
  return roles.some((role) => role.name.toLowerCase() === "ban quản lý dự án");
};
const areAllRolesDisabled = (roles) => {
  const disabledRoles = [
    "Quản Trị Hệ Thống",
    // "Cơ Quan Chính Phủ",
    // "Chính Quyền Địa Phương",
  ];
};
