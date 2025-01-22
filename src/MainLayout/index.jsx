import React, { useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderData from "./Header";
import Sidebar from "./Sidebar";
import "./index.css";
const { Header, Content, Footer, Sider } = Layout;
const Index = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        className="layout-sider"
        width={250}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Sidebar />
      </Sider>
      <Layout>
        <Header
          className="layout_header"
          style={{
            padding: 0,
            //   background: colorBgContainer,
          }}
        >
          <HeaderData collapsed={collapsed} onColChange={(value) => setCollapsed(value)} />
        </Header>
        <Content
          style={
            {
              // margin: "0 16px",
            }
          }
          className="content_container"
        >
          <div className="content_box">{children}</div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Index;
