import { Avatar, Badge, Button, Divider, Input, Tooltip } from "antd";
import React from "react";
import {
  BellFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
const Index = ({ onColChange, collapsed }) => {
  return (
    <div className="header-box-main">
      <div
        style={{
          height: "7vh",
        }}
      >
        <Tooltip title={collapsed ? "Show sidebar" : "Hide sidebar"}>
          <Button
            // size="large"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onColChange(!collapsed)}
          />
        </Tooltip>
        &nbsp; Welcome Admin
      </div>
      <div className="header-right">
        {/* <Input.Search /> */}
        <BellFilled style={{
            fontSize: "20px",
            color:"efefef"
        }} />
        <Divider type="vertical" />
        &nbsp;
        <Avatar>
          <UserOutlined />
        </Avatar>
      </div>
    </div>
  );
};

export default Index;
