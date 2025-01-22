import { connect, useDispatch } from "react-redux";
import ContainerLayout from "../../Components/ContainerLayout/ContainerLayout";

import ExtraContent from "./extraContent";
import TableBox from "./Table/Table";
import CreateDrawer from "./Drawer/CreateDrawer";
import ViewModal from "./Modal/ViewModal";
import { searchbyName } from "./Inventory.Slice";
import { useEffect } from "react";

const Index = (props) => {
  console.log(props);
  const { Inventory } = props;
  const { drawerVisible = false, ismodalVisible = false } = Inventory;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchbyName(""));
  }, []);
  return (
    <ContainerLayout title={"Inventory"} extra={<ExtraContent {...props} />}>
      <TableBox {...props} />
      {drawerVisible && <CreateDrawer {...props} />}
      {ismodalVisible && <ViewModal {...props} />}
    </ContainerLayout>
  );
};

export default connect((state) => ({
  Inventory: state.Inventory,
}))(Index);
