import { useQuery } from "@tanstack/react-query";
import { ProductServices } from "../../../services/Product";
import { Button, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IProduct } from "../../../types/Product";

const ProductList = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: ProductServices.fetchProducts,
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sell_price",
      dataIndex: "sell_price",
      key: "sell_price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
            <Button type="primary">Update</Button>
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
      <Table dataSource={products} columns={columns} loading={isLoading} />
    </>
  );
};

export default ProductList;
