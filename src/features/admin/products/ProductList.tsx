import { useQuery } from "@tanstack/react-query";
import { ProductServices } from "../../../services/Product";
import { Button, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IProduct } from "../../../types/Product";
import  formatVND  from "../../../utils/formatVND";
import { PenIcon } from "lucide-react";

const ProductList = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: ProductServices.fetchProducts,
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
      title: "BasePrice",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (value: number) => (
        <>
        <span>{formatVND(value)} VND</span>
        </>
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (record: string) => <img width={100} src={record} alt="" />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <>
          <Button color={status ? "green" : "red"} variant="outlined">
            {status ? "Active" : "Inactive"}
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: null, record: IProduct) => {
        console.log(record);
        return (
          <>
            <Button type="primary" ><PenIcon style={{ width: "14px", height: "14px" }} /></Button>
            <Button color="orange" variant="solid">
              <EyeOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      {/* <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>Thêm sản phẩm</Button> */}
      <Table dataSource={products} columns={columns} loading={isLoading} />
    </>
  );
};

export default ProductList;
