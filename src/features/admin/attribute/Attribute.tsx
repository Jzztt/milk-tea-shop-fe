import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttributeServices } from "../../../services/Atrribute";
import { Button, Form, Input, Modal, Table } from "antd";

const Attribute = () => {
  const queryClient = useQueryClient();
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();
  const { data: attributes, isLoading } = useQuery({
    queryKey: ["attributes"],
    queryFn: AttributeServices.fetchAttributes,
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button type="primary">Update</Button>
          <Button color="danger" variant="solid">
            Delete
          </Button>
        </>
      ),
    },
  ];

  const mutation = useMutation({
    mutationFn: AttributeServices.createAttribute,
    onSuccess: () => {
      setIsShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });

  const handSubmit = (values: { name: string }) => {
    mutation.mutate(values);
  };

  const handleCancel = () => {
    setIsShowModal(false);
    form.resetFields();
  }
  // Viết chức năng thêm attribute
  // B1: Sử dụng Form trong antd có validate requied rule => Xong
  // B2: viết service/Attribute đẩy dữ liệu lên server dùng tryCatch và async await
  // B3: sử dụng useMutation trong react-query
  // B3: kích hoạt services trong mutationFn bằng mutation.mutate
  return (
    <>
      <Button type="primary" onClick={() => setIsShowModal(true)}>
        Create Attribute
      </Button>
      <Table dataSource={attributes} loading={isLoading} columns={columns} />

      <Modal
        title="Create new Product"
        centered
        open={isShowModal}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical" form={form} onFinish={handSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input Name Attribute!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Attribute;
