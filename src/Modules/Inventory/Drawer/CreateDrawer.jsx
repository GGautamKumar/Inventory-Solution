import { Button, Drawer, Form, Input, InputNumber, Select } from "antd";
import { setDrawerVisible, setInventoryData } from "../Inventory.Slice";
import { useDispatch } from "react-redux";

const CreateDrawer = (props = {}) => {
  const { Inventory } = props;
  const dispatch = useDispatch();
  const { drawerVisible = false, type, editRecord } = Inventory;
  const [form] = Form.useForm();
  const submitData = async () => {
    const values = await form.validateFields();
    console.log(values);
    const data = {
      ...values,
      id: editRecord?._id,

      product_id: editRecord?.product_id,
    };
    dispatch(setInventoryData(data));
  };
  return (
    <Drawer
      footer={
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() =>
              dispatch(
                setDrawerVisible({
                  visible: false,
                  type: "",
                })
              )
            }
          >
            Close
          </Button>
          &nbsp;
          <Button
            type="primary"
            onClick={() => {
              submitData();
            }}
          >
            {type === "create" ? "Create" : "Update"}
          </Button>
        </div>
      }
      width={450}
      title={type === "create" ? "Create" : "Update"}
      onClose={() => {
        dispatch(
          setDrawerVisible({
            visible: false,
            type: "create",
          })
        );
      }}
      open={drawerVisible}
    >
      <Form initialValues={editRecord} form={form} layout="vertical">
        <Form.Item name={"product_name"} label="Product Name">
          <Input placeholder="Enter Product Name" />
        </Form.Item>
        <Form.Item name={"category"} label="Category">
          <Select placeholder={"Select Category"}>
            <Select.Option value="Electronics">Electronics</Select.Option>
            <Select.Option value="Grocery">Grocery</Select.Option>
            <Select.Option value="Household">Household</Select.Option>
            <Select.Option value="Beauty">Beauty</Select.Option>
            <Select.Option value="Snacks">Snacks</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Price" name={"price"}>
          <InputNumber
          min={1}
            style={{
              width: "100%",
            }}
            placeholder="Price"
          />
        </Form.Item>
        <Form.Item name={"gst_rate"} label="GST Rate">
          <InputNumber
          min={1}
            style={{
              width: "100%",
            }}
            placeholder="Enter GST"
          />
        </Form.Item>
        <Form.Item label="Stock Quantity" name={"stock_quantity"}>
          <InputNumber
            style={{
              width: "100%",
            }}
            placeholder="Enter Stock Quantity"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateDrawer;
