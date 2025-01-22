import { Button, Input, Space } from "antd";
import React from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { searchbyName, setDrawerVisible } from "./Inventory.Slice";
const ExtraContent = () => {
  const dispatch = useDispatch();
  return (
    <Space align="center">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input.Search
          allowClear
          onChange={(e) => {
            dispatch(searchbyName(e.target.value));
          }}
        />
      </div>
      <Button
        onClick={() => {
          dispatch(
            setDrawerVisible({
              visible: true,
              type: "create",
            })
          );
        }}
        type="primary"
        icon={<PlusSquareOutlined />}
      >
        Create
      </Button>
    </Space>
  );
};

export default ExtraContent;
