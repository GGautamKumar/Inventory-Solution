import { Table } from "antd";
import ColData from "./TableColumn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInventoryList } from "../Inventory.Action";
const TableBox = (props) => {
  const { Inventory } = props;
  const dispatch = useDispatch();
  const { InventoryData = [], searchparam = "" } = Inventory;
  useEffect(() => {
    dispatch(getInventoryList());
  }, []);

  const filteredArray = InventoryData.filter((product) =>
    product.product_name.toLowerCase().includes(searchparam.toLowerCase())
  );
  const isfiltered = filteredArray?.length > 0 ? filteredArray : InventoryData;
  return (
    <Table size="middle" dataSource={isfiltered} columns={[...ColData()]} />
  );
};

export default TableBox;
