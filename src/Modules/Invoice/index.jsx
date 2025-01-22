import { Button, Space, Table } from "antd";
import { connect, useDispatch } from "react-redux";
import ContainerLayout from "../../Components/ContainerLayout/ContainerLayout";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import InvoiceViewDrawer from "./Drawer/InvoiceViewDrawer";
import { setDrawerVisible } from "./Invoice.slice";

const Index = (props) => {
  const { Invoice } = props;
  const { InvoiceList = [], viewInvoicedrawerVisible = false } = Invoice;
  console.log(InvoiceList);
  const dispatch = useDispatch();
  return (
    <ContainerLayout title={"Invoice"}>
      <Table
        columns={[
          {
            key: "invoiceId",
            title: "Invoice No",
            dataIndex: "invoiceId",
          },
          {
            key: "invoiceDate",
            title: "Invoice Date",
            dataIndex: "invoiceDate",
          },
          {
            key: "totalAmountwithGst",
            title: "Invoice Amount",
            dataIndex: "totalAmountwithGst",
            render: (totalAmountwithGst, record) => (
              <span>Rs.{totalAmountwithGst}</span>
            ),
          },
          {
            key: "action",
            title: "Action",
            dataIndex: "Action",
            render: (_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    dispatch(
                      setDrawerVisible({
                        visible: true,
                        record: record,
                      })
                    );
                  }}
                  icon={
                    <EyeOutlined
                      style={{
                        color: "blue",
                      }}
                    />
                  }
                  type="text"
                ></Button>
              </Space>
            ),
          },
        ]}
        dataSource={InvoiceList}
      />
      {viewInvoicedrawerVisible && <InvoiceViewDrawer {...props} />}
    </ContainerLayout>
  );
};

export default connect((state) => ({
  Inventory: state.Inventory,
  Invoice: state.Invoice,
}))(Index);
