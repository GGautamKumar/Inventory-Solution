import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteInventoryData,
  setDrawerVisible,
  setViewModalVisible,
} from "../Inventory.Slice";

const TableColumn = () => {
  const dispatch = useDispatch();
  const ColData = [
    {
      title: "Product Id",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <span>{category}</span>,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price}</span>,
    },
    {
      title: "GST Rate",
      dataIndex: "gst_rate",
      key: "gst_rate",
      render: (gst_rate) => <span>{gst_rate}%</span>,
    },
    {
      title: "Stock Quantity",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
    },
    {
      title: "Action",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          <Space>
            <Button
              icon={
                <EyeOutlined
                  style={{
                    color: "blue",
                  }}
                />
              }
              type="text"
              onClick={() => {
                dispatch(
                  setViewModalVisible({
                    visible: true,
                    record: record,
                  })
                );
              }}
            ></Button>
            <Button
              icon={<EditOutlined />}
              type="text"
              onClick={() => {
                dispatch(
                  setDrawerVisible({
                    visible: true,
                    type: "edit",
                    record: record,
                  })
                );
              }}
            ></Button>
            <Button
              icon={
                <DeleteOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              type="text"
              onClick={() => {
                dispatch(deleteInventoryData({ id: record?._id }));
              }}
            ></Button>
          </Space>
        </>
      ),
    },
  ];
  return ColData;
};

export default TableColumn;
