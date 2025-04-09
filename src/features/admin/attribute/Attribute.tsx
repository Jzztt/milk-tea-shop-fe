import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttributeServices } from "../../../services/Atrribute";
import { Button, Form, Input, Modal, Popconfirm, Switch, Table } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { IAttribute } from "../../../types/attribute";

const Attribute = () => {
  const queryClient = useQueryClient();
  const [isShowModal, setIsShowModal] = useState(false);
  const [idEditAttribute, setIdEditAttribute] = useState<string>('');
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <>
          {status ? (
            <Button color="primary" variant="outlined">
              Active
            </Button>
          ) : (
            <Button color="danger" variant="outlined">
              InActive
            </Button>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: IAttribute) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => handleShowModal(record)}>
            <Pencil style={{ width: "12px", height: "12px" }} />
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => mutationDelete.mutate(record._id)}
          >
            <Button color="danger" variant="solid">
              <Trash2 style={{ width: "12px", height: "12px" }} />
            </Button>
          </Popconfirm>
        </div>
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

  const mutationUpdate = useMutation({
    mutationFn:AttributeServices.EditAttribute,
    onSuccess: () => {
      handleCancel()
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: AttributeServices.deleteAttribute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
    },
  });

  const handSubmit = (values: { name: string; status: boolean }) => {
    if (!idEditAttribute) {
      mutation.mutate(values);
    } else {
      const payload = {...values, _id : idEditAttribute}
      mutationUpdate.mutate(payload);
    }
  };

  const handleCancel = () => {
    setIsShowModal(false);
    form.resetFields();
    setIdEditAttribute("");
  };

  const handleShowModal = (attributes: IAttribute | null) => {
    setIsShowModal(true);
    if (attributes) {
      form.setFieldsValue(attributes);
      setIdEditAttribute(attributes._id);
    }
  };
  return (
    <>
      <Button type="primary" onClick={() => handleShowModal(null)}>
        Create Attribute
      </Button>
      <Table
        dataSource={attributes}
        loading={isLoading}
        columns={columns}
        rowKey="_id"
      />

      <Modal
        title={idEditAttribute ? "Update Attribute" : "Create Attribute"}
        centered
        open={isShowModal}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handSubmit}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input Name Attribute!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
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
