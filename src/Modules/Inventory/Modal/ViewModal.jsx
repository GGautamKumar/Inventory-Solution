import { Badge, Card, Descriptions, Modal } from "antd";
import { setViewModalVisible } from "../Inventory.Slice";
import { useDispatch } from "react-redux";

const ViewModal = (props) => {
  const { Inventory } = props;
  const dispatch = useDispatch();
  const { ismodalVisible = false, type, viewRecord = {} } = Inventory;
  return (
    <Modal
      footer={false}
      title={`View Details of ${viewRecord?.product_name}`}
      onCancel={() => {
        dispatch(
          setViewModalVisible({
            visible: false,
            record: {},
          })
        );
      }}
      centered
      open={ismodalVisible}
    >
      <Card
        title={`Product ID: ${viewRecord.product_id}`}
        bordered={false}
        style={{ width: "100%" }}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Product Name">
            {viewRecord.product_name}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {viewRecord.category}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${viewRecord.price}
          </Descriptions.Item>
          <Descriptions.Item label="GST Rate">
            {viewRecord.gst_rate}%
          </Descriptions.Item>
          <Descriptions.Item label="Stock Quantity">
            <Badge
              status={viewRecord?.stock_quantity > 0 ? "success" : "error"}
              text={`${viewRecord?.stock_quantity} units`}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Database ID">
            {viewRecord?._id}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default ViewModal;
