import { useState } from "react";
import {
  Table,
  Select,
  InputNumber,
  Typography,
  Button,
  Row,
  Col,
  Divider,
  Form,
  Input,
  message,
  Result,
  Empty,
} from "antd";
import ContainerLayout from "../../Components/ContainerLayout/ContainerLayout";
import { connect, useDispatch } from "react-redux";
import { setCheckoutModalVisible, setQuantitybyId } from "./Cart.Slice";
import { NavLink } from "react-router";
import CheckoutModal from "./Model/CheckoutModal";

const { Title, Text } = Typography;

const Index = (props) => {
  const { Cart } = props;
  const { cartItems = [], isCheckoutModalVisible = false } = Cart;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [discountApplied, setDiscountApplied] = useState(false);
  // const [cartItems, setCartItems] = useState([
  //   {
  //     key: "1",
  //     image: "https://via.placeholder.com/50",
  //     description: "Men Printed Shirt",
  //     size: "M",
  //     quantity: 1,
  //     price: 899,
  //     delivery: "Delivery by April 12-14",
  //   },
  //   {
  //     key: "2",
  //     image: "https://via.placeholder.com/50",
  //     description: "Men Printed Shirt",
  //     size: "M",
  //     quantity: 1,
  //     price: 899,
  //     delivery: "Delivery by April 12-14",
  //   },
  //   {
  //     key: "3",
  //     image: "https://via.placeholder.com/50",
  //     description: "Men Printed Shirt",
  //     size: "M",
  //     quantity: 1,
  //     price: 899,
  //     delivery: "Delivery by April 12-14",
  //   },
  // ]);
  const validateCoupon = (values) => {
    const validCoupon = "DISCOUNT10"; // Predefined coupon code
    if (values.coupon === validCoupon) {
      message.success("Coupon applied successfully! You got a 10% discount.");
      setDiscountApplied(true);
    } else {
      message.error("Invalid coupon code. Please try again.");
      setDiscountApplied(false);
    }
  };
  const [orderSummary, setOrderSummary] = useState({
    itemTotal: 2697,
    shipping: 260,
    discounts: 200,
    finalTotal: 2757,
  });

  const handleQuantityChange = (value, key) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.key === key) {
        const newQuantity = value || 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Recalculate the order summary
    const itemTotal = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const finalTotal =
      itemTotal + orderSummary.shipping - orderSummary.discounts;
    setOrderSummary({ ...orderSummary, itemTotal, finalTotal });
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          size="small"
          min={1}
          defaultValue={1}
          onChange={(value) => {
            dispatch(
              setQuantitybyId({
                ...record,
                quantity: value,
              })
            );
          }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, record) => `Rs. ${price}`,
    },
    {
      title: "GST Rate",
      dataIndex: "gst_rate",
      key: "gst_rate",
      render: (gst_rate, record) => `${gst_rate}%`,
      width: 50,
    },
    {
      title: "Total(with gst)",
      dataIndex: "total",
      key: "total",
      render: (gst_rate, record) => (
        <>
          {record?.price * record?.quantity * (record?.gst_rate / 100) +
            record?.price * record?.quantity}
        </>
      ),
      width: 100,
    },
  ];
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      const gst = item.price * (item.gst_rate / 100);
      const itemTotal = (item.price + gst) * item.quantity;
      return total + itemTotal;
    }, 0);
  };
  const calculateTotalAmountwithoutgst = (items) => {
    return items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }, 0);
  };
  return (
    <ContainerLayout title={"Shoping Cart"}>
      {cartItems.length > 0 ? (
        <Form form={form}>
          <div
            style={{
              padding: "20px",
              maxWidth: 800,
              margin: "0 auto",
              height: "80vh",
              overflowY: "auto",
            }}
          >
            <Table
              size="small"
              scroll={{
                x: "fit-content",
                y: `calc(100vh - ${600}px)`,
              }}
              dataSource={cartItems}
              columns={columns}
              pagination={false}
              summary={() => (
                <tr>
                  <td colSpan={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      * Add $10 more to get free shipping.
                    </Text>
                  </td>
                </tr>
              )}
            />
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={"apply_coupon"} label={"Apply Coupon"}>
                  <Input placeholder="Apply coupon code"></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: "right" }}>
                  <Title level={5}>Order Summary</Title>
                  <div>
                    <Text>Item Total:</Text>
                    <Text style={{ float: "right" }}>
                      Rs. {calculateTotalAmount(cartItems)}
                    </Text>
                  </div>

                  <div>
                    <Text>Discounts:</Text>
                    <Text style={{ float: "right" }}>Rs. {500}</Text>
                  </div>
                  <Divider />
                  <div>
                    <Text strong>Final Total:</Text>
                    <Text strong style={{ float: "right" }}>
                      Rs {calculateTotalAmount(cartItems) - 500}
                    </Text>
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <Button
              onClick={() => {
                dispatch(
                  setCheckoutModalVisible({
                    visible: true,
                    record: {
                      cartItems: cartItems,
                      totalAmountwithGst: calculateTotalAmount(cartItems),
                      totalAmountwithoutGst:
                        calculateTotalAmountwithoutgst(cartItems),
                      discount: 200,
                    },
                  })
                );
              }}
              type="primary"
              block
              size="middle"
              style={{ marginTop: 5 }}
            >
              Proceed to Checkout
            </Button>
            <NavLink to={`/product`}>
              <Button
                type="default"
                block
                size="middle"
                style={{ marginTop: 2 }}
              >
                Continue Shopping
              </Button>
            </NavLink>
          </div>
        </Form>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            styles={{
              image: {
                height: 60,
              },
            }}
            description={<Typography.Text>Nothing in cart yet</Typography.Text>}
          >
            <NavLink to={"/product"}>
              <Button type="primary">Add Now</Button>
            </NavLink>
          </Empty>
        </div>
      )}
      {isCheckoutModalVisible && <CheckoutModal {...props} />}
    </ContainerLayout>
  );
};

export default connect((state) => ({
  Inventory: state.Inventory,
  Cart: state.Cart,
}))(Index);
