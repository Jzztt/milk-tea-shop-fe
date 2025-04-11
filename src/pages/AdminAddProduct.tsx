import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
  Space,
  Upload,
  Row,
  Col,
  Divider,
  Switch,
  UploadFile,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import { AttributeServices } from "../services/Atrribute";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IVariant } from "../types/variant";
import { ProductServices } from "../services/Product";
import toast from "react-hot-toast";
import { UploadService } from "../services/Upload";
import { Trash2 } from "lucide-react";

const { TextArea } = Input;

const AdminAddProduct = () => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data: attributes = [] } = useQuery({
    queryKey: ["attributes"],
    queryFn: AttributeServices.fetchAttributes,
  });

  const mutation = useMutation({
    mutationFn: ProductServices.createProduct,
    onSuccess: () => {
      form.resetFields();
      setVariants([]);
      setFileList([]);
    },
  });

  const addVariant = () => {
    if (selectedAttributes.length === 0) {
      toast.error("Vui lòng chọn thuộc tính trước khi thêm biến thể.");
      return;
    }
    setVariants((prev) => [...prev, { options: {}, stock: 0, sku: "" }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("Vui lòng chỉ tải lên tệp hình ảnh!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      toast.error("Hình ảnh phải nhỏ hơn 5MB!");
      return false;
    }
    return true;
  };

  const handleUpload = async ({ file }) => {
    try {
      const response = await UploadService.uploadImage(file);
      const { url, public_id } = response;

      if (url) {
        setFileList((prev) =>
          prev.map((item) =>
            item.uid === file.uid
              ? { ...item, status: "done", url, publicId: public_id }
              : item
          )
        );
        form.setFieldsValue({ imageUrl: url });
        toast.success("Tải ảnh lên thành công!");
      } else {
        toast.error("Không nhận được URL ảnh từ server!");
      }
    } catch (error) {
      console.error("Upload failed: ", error);
      toast.error("Tải ảnh lên thất bại!");
      setFileList((prev) =>
        prev.map((item) =>
          item.uid === file.uid ? { ...item, status: "error" } : item
        )
      );
    }
  };

  const handleRemove = async (file) => {
    try {
      const publicId = file.publicId;
      if (!publicId) {
        throw new Error("Không tìm thấy public_id của ảnh!");
      }

      const response = await UploadService.deleteImage(publicId);
      if (response.success) {
        setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
        form.setFieldsValue({ imageUrl: undefined });
        toast.success("Xóa ảnh thành công!");
      } else {
        throw new Error("Không thể xóa ảnh!");
      }
    } catch (error) {
      console.error("Delete image failed: ", error);
      toast.error("Xóa ảnh thất bại!");
      return false;
    }
  };

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      attributes: selectedAttributes,
      predefinedVariants: variants.map((v) => ({
        options: Object.values(v.options),
        stock: v.stock,
      })),
    };
    console.log(payload);

    mutation.mutate(payload);
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Thêm sản phẩm mới
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: true,
        }}
      >
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              <Input className="rounded-lg" />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
              <TextArea rows={3} className="rounded-lg" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select className="rounded-lg" placeholder="Danh mục">
                <Select.Option value="Milk Tea">Milk Tea</Select.Option>
                <Select.Option value="Fruit Tea">Fruit Tea</Select.Option>
                <Select.Option value="Coffee">Coffee</Select.Option>
              </Select>
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="basePrice"
                  label="Giá cơ bản (VND)"
                  rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="salePrice"
                  label="Giá sale (VND)"
                  rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Form.Item
              name="imageUrl"
              label="Hình ảnh sản phẩm"
              rules={[
                { required: true, message: "Vui lòng tải lên hình ảnh!" },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                customRequest={handleUpload}
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
              >
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 12 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="status" label="Tinh trang" valuePropName="checked" >
          <Switch defaultChecked />
        </Form.Item>

        <Divider />
        <Form.Item label="Chọn thuộc tính">
          <Select
            placeholder="Chọn thuộc tính"
            mode="multiple"
            value={selectedAttributes}
            onChange={setSelectedAttributes}
            style={{ width: "100%" }}
          >
            {attributes.map((attribute) => (
              <Select.Option key={attribute._id} value={attribute._id}>
                {attribute.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Space direction="vertical" className="w-full">
          {variants.length > 0 && selectedAttributes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 className="text-lg font-medium mb-3">Danh sách biến thể</h3>
              {variants.map((variant, index) => (
                <Card
                  key={index}
                  title={`Biến thể ${index + 1}`}
                  extra={
                    <Button type="text" onClick={() => removeVariant(index)}>
                      <Trash2 className="text-red-500 h-4 w-4" />
                    </Button>
                  }
                  className="mb-4 shadow-md rounded-lg"
                >
                  {selectedAttributes.map((attrId) => {
                    const attr = attributes.find((a) => a._id == attrId);

                    return (
                      <Form.Item key={attrId} label={attr?.name}>
                        <Select
                          value={variant.options[attrId] || null}
                          onChange={(value) => {
                            const updatedOptions = {
                              ...variant.options,
                              [attrId]: value,
                            };
                            updateVariant(index, "options", updatedOptions);
                          }}
                        >
                          {attr?.values.map((val) => (
                            <Select.Option key={val._id} value={val._id}>
                              {val.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    );
                  })}
                  <Form.Item
                    label="Số lượng tồn kho"
                    rules={[
                      { required: true, message: "Vui lòng nhập số lượng!" },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      value={variant.stock}
                      onChange={(value) => updateVariant(index, "stock", value)}
                      className="w-full rounded-lg"
                    />
                  </Form.Item>
                </Card>
              ))}
            </div>
          )}
        </Space>

        <Button
          type="dashed"
          onClick={addVariant}
          icon={<PlusOutlined />}
          className="w-full mb-4 shadow-sm border-gray-300 hover:border-gray-500 rounded-lg"
        >
          Thêm biến thể
        </Button>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isLoading}
            className="w-full rounded-lg"
          >
            Lưu sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAddProduct;
