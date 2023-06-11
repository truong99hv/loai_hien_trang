import React from "react";
import { Modal, Button } from "antd";

const ConfirmDeleteModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      on={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="delete" type="primary" danger onClick={onConfirm}>
          Xóa
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
    </Modal>
  );
};

export default ConfirmDeleteModal;
