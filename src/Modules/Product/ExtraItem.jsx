import { Badge, Button, Input, Space, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { searchbyName } from "../Inventory/Inventory.Slice";

const ExtraItem = (props) => {
  const { Cart } = props;
  const { cartItems = [] } = Cart;
  const dispatch = useDispatch();

  return (
    <Space>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input.Search allowClear onChange={(e) => {
            dispatch(searchbyName(e.target.value))
        }} placeholder="search..." />
      </div>
      <Tooltip title={"Proceed to Cart"}>
        <NavLink to="/cart">
          <Button icon={<ShoppingCartOutlined />} type="primary">
            {`Proceed To Cart (${cartItems?.length || 0})`}
          </Button>
        </NavLink>
      </Tooltip>
    </Space>
  );
};

export default ExtraItem;
