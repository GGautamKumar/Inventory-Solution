import { useEffect, useState } from "react";
import { List, Card, Button, Badge, message } from "antd";
import { connect, useDispatch } from "react-redux";
import ContainerLayout from "../../Components/ContainerLayout/ContainerLayout";
import ExtraItem from "./ExtraItem";
import { setCartDetails } from "../Cart/Cart.Slice";
import { searchbyName } from "../Inventory/Inventory.Slice";

const Index = (props) => {
  const { Inventory } = props;

  const { InventoryData = [], searchparam = "" } = Inventory;
  const dispatch = useDispatch();
  useEffect(() => {
    
 dispatch(searchbyName(""))
  }, []);
  const addToCart = (product) => {
    dispatch(setCartDetails({ ...product, quantity: 1 }));
  };
  const filteredArray = InventoryData.filter((product) =>
    product.product_name.toLowerCase().includes(searchparam.toLowerCase())
  );
  const isfiltered = filteredArray?.length > 0 ? filteredArray : InventoryData;
  return (
    <ContainerLayout title={"Product List"} extra={<ExtraItem {...props} />}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={isfiltered}
        renderItem={(product) => (
          <List.Item>
            <Card
              title={product.product_name}
              extra={
                <Badge
                  status={product.stock_quantity > 0 ? "success" : "error"}
                  text={
                    product.stock_quantity > 0 ? "In Stock" : "Out of Stock"
                  }
                />
              }
            >
              <p>Category: {product.category}</p>
              <p>Price: Rs{product.price}</p>
              <p>GST Rate: {product.gst_rate}%</p>
              <Button
                // type="primary"
                block
                disabled={product.stock_quantity == 0}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </ContainerLayout>
  );
};

export default connect((state) => ({
  Inventory: state.Inventory,
  Cart: state.Cart,
}))(Index);
