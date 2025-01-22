import { Button, message, Modal } from "antd";
import { setCartEmpty, setCheckoutModalVisible } from "../Cart.Slice";
import { useDispatch } from "react-redux";
import { CreateInvoive } from "../../Invoice/Invoice.slice";
import { NavLink } from "react-router";
import { setMangeInventory } from "../../Inventory/Inventory.Slice";

const CheckoutModal = (props) => {
  const { Cart } = props;
  const { isCheckoutModalVisible = false, draftInvoice } = Cart;
  const dispatch = useDispatch();
  return (
    <Modal
      onCancel={() => {
        dispatch(
          setCheckoutModalVisible({
            visible: false,
          })
        );
      }}
      footer={
        <div>
          <Button
            onClick={() => {
              dispatch(
                setCheckoutModalVisible({
                  visible: false,
                })
              );
            }}
          >
            Cancel
          </Button>
          <NavLink to={`/invoice`}>
            <Button
              type="primary"
              onClick={() => {
                dispatch(
                  CreateInvoive({
                    ...draftInvoice,
                  })
                );
                dispatch(
                  setCheckoutModalVisible({
                    visible: false,
                  })
                );
                dispatch(setCartEmpty());
                dispatch(setMangeInventory(draftInvoice));
                message.success("Invoice created successfully");
              }}
            >
              Checkout
            </Button>
          </NavLink>
        </div>
      }
      open={isCheckoutModalVisible}
    >
      <h2>Proceed with Cart</h2>
    </Modal>
  );
};

export default CheckoutModal;
