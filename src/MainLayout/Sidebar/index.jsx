import { Avatar, Menu } from "antd";
import React from "react";
import menu from "./Menu";
import { NavLink } from "react-router";
// import { NavLink } from "react-router";
import "./index.css";
const Index = () => {
  return (
    <>
      <div className="logo">
        <Avatar>IM</Avatar>
      </div>
      <div className="hrc" />
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[window.location.pathname]}
        defaultSelectedKeys={[window.location.pathname]}
        items={menu().map((icon) => ({
          key: icon.key,
          icon: React.createElement(icon?.icon),
          label: (
            <NavLink className="navlink" to={icon.key}>
              {icon.label}
            </NavLink>
          ),
        }))}
      />
    </>
  );
};

export default Index;
