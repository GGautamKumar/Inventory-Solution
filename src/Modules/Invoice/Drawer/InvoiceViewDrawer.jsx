import { Button, Drawer } from "antd";
import React from "react";
import { setDrawerVisible } from "../Invoice.slice";
import { DownloadOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const InvoiceViewDrawer = (props) => {
  const { Invoice } = props;
  const { viewInvoicedrawerVisible, InvoiceRecord = {} } = Invoice;
  console.log(InvoiceRecord);
  const dispatch = useDispatch();
  const downloadInvoice = () => {
    const input = document.getElementById("invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${InvoiceRecord?.invoiceId}.pdf`);
    });
  };
  return (
    <Drawer
      extra={
        <Button
          onClick={() => {
            downloadInvoice();
          }}
          icon={<DownloadOutlined />}
        >
          Download
        </Button>
      }
      width={600}
      title={`Invoice of ${InvoiceRecord?.invoiceId}`}
      onClose={() => {
        dispatch(
          setDrawerVisible({
            visible: false,
            record: {},
          })
        );
      }}
      open={viewInvoicedrawerVisible}
    >
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
          lineHeight: "1.6",
        }}
      >
        <div
          style={{
            width: "80%",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div id="invoice">
            {/* Shop Details */}
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ margin: "0" }}>ABC</h2>
              <p style={{ margin: "5px 0" }}>Address:A-09 New Delhi-110054</p>
              <p style={{ margin: "5px 0" }}>GSTIN: 0XARTEYUWBGGBDHJ</p>
            </div>

            {/* Invoice Details */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ margin: "5px 0" }}>
                <strong>Invoice Number:</strong> {InvoiceRecord?.invoiceId}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Date:</strong> {InvoiceRecord?.invoiceDate}
              </p>
            </div>

            {/* Product Table */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    GST Rate (%)
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    GST Amount
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    Total Price (Incl. GST)
                  </th>
                </tr>
              </thead>
              <tbody>
                {InvoiceRecord?.cartItems.map((product, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {product?.product_name}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {product?.stock_quantity}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      ₹{product?.price}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {product?.gst_rate}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      ₹
                      {Math.ceil(product?.price *
                        product?.quantity *
                        (product?.gst_rate / 100))}
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      ₹{" "}
                      {Math.ceil(product?.price *
                        product?.quantity *
                        (product?.gst_rate / 100) +
                        product?.price * product?.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <strong>Total Amount (Excl. GST):</strong> ₹
                {InvoiceRecord?.totalAmountwithoutGst || 0}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Total GST:</strong> ₹
                {InvoiceRecord?.totalAmountwithGst -
                  InvoiceRecord?.totalAmountwithoutGst}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Grand Total (Incl. GST):</strong> ₹
                {InvoiceRecord?.totalAmountwithGst || 0}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Discount:</strong> ₹
                {InvoiceRecord?.discount.toLocaleString()}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Net Total (After Discount):</strong> ₹
                {InvoiceRecord?.totalAmountwithGst - InvoiceRecord?.discount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default InvoiceViewDrawer;
