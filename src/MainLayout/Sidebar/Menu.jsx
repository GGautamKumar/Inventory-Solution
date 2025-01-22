import {
  DashboardOutlined,
  UserOutlined,
  FolderAddOutlined,
  SettingOutlined,
  PayCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Menu = () => {
  const data = [
    // {
    //   id: "home",
    //   label: "Home",
    //   key: "/",
    //   icon: DashboardOutlined,
    // },
    {
      id: "inventory",
      label: "Inventory",
      key: "/",
      icon: DashboardOutlined,
    },
    {
      id: "Product",
      icon: FolderAddOutlined,
      label: "Product",
      key: "/product",
      // children: [{key: '/collection/premintasset/', label: 'Premint'} ]
    },

    // {
    //   id: "setting",
    //   icon: SettingOutlined,
    //   label: "Settings",
    //   key: "/setting",
    // },
    {
      id: "cart",
      icon: ShoppingCartOutlined,
      label: "Cart",
      key: "/cart",
    },
    {
      id: "invoice",
      icon: ShoppingCartOutlined,
      label: "Invoice",
      key: "/invoice",
    },
  ];
  return data;
};

export default Menu;
