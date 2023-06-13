import React, { useState, useEffect } from "react";
import { Checkbox, Input, Modal, Form, message, Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./modalAddNew.css";

const ModalAddNew = ({
  isModalVisible,
  setIsModalVisible,
  handleAddNewUser,
  resetData,
  isUpdate,
  initialValues,
  handleUpdateUser,
}) => {
  const [roles, setRoles] = useState([]);

  const [form] = Form.useForm();
  const token = localStorage.getItem("user-token");

  useEffect(() => {
    const fetchRoles = async () => {
      const url = "http://wlp.howizbiz.com/api/roles";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(url, { headers });
        setRoles(response.data);
      } catch (error) {
        console.error("Lỗi khi truy vấn danh sách vai trò:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    // Khi modal mở lên, kiểm tra xem có phải thực hiện "Cập nhật" hay không
    if (isModalVisible && isUpdate) {
      form.setFieldsValue({
        password: "", // Xóa giá trị của trường mật khẩu
        confirmPassword: "", // Xóa giá trị của trường xác nhận mật khẩu
      });
    }
  }, [isModalVisible, isUpdate, form]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleFormSubmit = async (values, api) => {
    const url = "http://wlp.howizbiz.com/api/users";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(url, values, { headers });
      setIsModalVisible(false);
      message.success("Thêm mới người dùng thành công");
      const newUser = { ...values };
      handleAddNewUser(newUser);
      if (resetData) {
        resetData();
        console.log(resetData);
      }
    } catch (error) {
      console.error("Lỗi khi thêm mới người dùng:", error);
    }
  };

  // const validationSchema = Yup.object().shape({
  //   displayName: Yup.string().required("Vui lòng nhập tên hiển thị"),
  //   username: Yup.string()
  //     .required("Vui lòng nhập tên đăng nhập")
  //     .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
  //     .max(20, "Tên đăng nhập không được vượt quá 20 ký tự"),
  //   email: Yup.string()
  //     .email("Email không hợp lệ")
  //     .required("Vui lòng nhập email"),
  //   password: Yup.string().required("Vui lòng nhập mật khẩu"),
  //   confirmPassword: Yup.string()
  //     .required("Vui lòng nhập xác nhận mật khẩu")
  //     .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
  // });

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role_ids: roles.map((role) => role.id),
      provinces: [],
      khubaoton: [],
      isUpdate: false,
    },
    // validationSchema,
    onSubmit: isUpdate ? handleUpdateUser : handleFormSubmit,
  });

  const handleCheckboxChange = (roleId, checked) => {
    const { values, setFieldValue } = formik;

    if (roleId === 5) {
      const updatedKhubaoton = checked ? [] : values.khubaoton;
      setFieldValue("khubaoton", updatedKhubaoton);
    }

    if (roleId === 4) {
      const updatedProvinces = checked ? [] : values.provinces;
      setFieldValue("provinces", updatedProvinces);
    }

    const updatedRoles = checked
      ? [...values.role_ids, roleId]
      : values.role_ids.filter((id) => id !== roleId);

    setFieldValue("role_ids", updatedRoles);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
    // selectedUser(null);
  };

  return (
    <Modal
      title={isUpdate ? "Cập nhật người dùng" : "Thêm mới người dùng"}
      open={isModalVisible}
      onOk={formik.handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="Tên hiển thị"
          name="name"
          validateStatus={formik.errors.name && "error"}
          help={formik.errors.name}
        >
          <Input onChange={formik.handleChange} value={formik.values.name} />
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          validateStatus={formik.errors.username && "error"}
          help={formik.errors.username}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          validateStatus={formik.errors.email && "error"}
          help={formik.errors.email}
        >
          <Input onChange={formik.handleChange} value={formik.values.email} />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="mobile">
          <Input onChange={formik.handleChange} value={formik.values.mobile} />
        </Form.Item>
        {!isUpdate && (
          <>
            <>
              <Form.Item
                label="Mật khẩu"
                name="password"
                validateStatus={formik.errors.password && "error"}
                help={formik.errors.password}
              >
                <Input.Password
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Form.Item>
            </>
            <>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                validateStatus={formik.errors.confirmPassword && "error"}
                help={formik.errors.confirmPassword}
              >
                <Input.Password
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </Form.Item>
            </>
          </>
        )}
        <Form.Item label="Quyền" name="role_ids">
          {roles.map((role) => (
            <Checkbox
              key={role.id}
              value={role.id}
              checked={formik.values.role_ids.includes(role.id)}
              onChange={(e) => handleCheckboxChange(role.id, e.target.checked)}
            >
              {role.name}
            </Checkbox>
          ))}
        </Form.Item>
        {/* <Form.Item>
          <Button htmlType="submit">add</Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalAddNew;
