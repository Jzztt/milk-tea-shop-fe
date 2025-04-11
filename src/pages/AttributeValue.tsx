import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Switch,
  Table,
} from "antd";
import React, { useState } from "react";
import { AttributeValueServices } from "../services/AttributeValue";
import { Pencil, Trash2 } from "lucide-react";
import { AttributeServices } from "../services/Atrribute";
import { IAttribute } from "../types/attribute";

const AttributeValue = () => {
  const queryClient = useQueryClient();
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();
  const { data: attributeValues, isLoading } = useQuery({
    queryKey: ["attributeValues"],
    queryFn: AttributeValueServices.getAllAttributeValue,
  });

  const { data: attributes } = useQuery({
    queryKey: ["attribute"],
    queryFn: AttributeServices.fetchAttributes,
  });

  const mutationCreate = useMutation({
    mutationFn: AttributeValueServices.createAttributeValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributeValues"] });
    },
  });
  const colums = [
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
      title: "ExtraPrice",
      dataIndex: "extraPrice",
      key: "extraPrice",
    },
    {
      title: "Attribute",
      dataIndex: "attributeId",
      key: "attributeId",
      render: (values: { _id: string; name: string }) => (
        <span>{values.name}</span>
      ),
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
      render: (record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary">
            <Pencil style={{ width: "12px", height: "12px" }} />
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
          >
            <Button color="danger" variant="solid">
              <Trash2 style={{ width: "12px", height: "12px" }} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      extraPrice: Number(values.extraPrice),
    };
    mutationCreate.mutate(payload);
  };

  return (
    <>
      <Button type="primary" onClick={handleShowModal}>
        Create Attribute Value
      </Button>
      <Table
        dataSource={attributeValues}
        columns={colums}
        loading={isLoading}
        // rowKey={AttributeValue._id}
      />

      <Modal title="Create Attribute Value" centered open={isShowModal} onCancel={handleCancel} footer={false}>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{ status: true }}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Extra Price" name="extraPrice">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Attribute" name="attributeId">
            <Select placeholder="Select Attribute">
              {attributes?.map((attribute: IAttribute) => (
                <Select.Option key={attribute._id} value={attribute._id}>
                  {attribute.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AttributeValue;
