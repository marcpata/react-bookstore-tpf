import { Card, Col, Divider, Row, Skeleton, Table, PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardSider from "../Components/DashboardSider";
import LayoutWithSider from "../Components/LayoutWithSider";
import { getAllOrders } from "../Services/Orders";
import { getAllProducts } from "../Services/Products";

function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalSold: 0,
    totalSend: 0,
    totalWait: 0,
    totalBalance: 0,
  });
  const [topFive, setTopFive] = useState([]);
  const [loading, setLoading] = useState(false);

  const calcTotales = async () => {
    setLoading(true);
    const docsProd = await getAllProducts("Sold", "desc");
    const totalSold = docsProd.map((item) => item.Sold).reduce((a, b) => a + b);
    const totalBalance = docsProd
      .map((item) => item.Sold * item.Precio)
      .reduce((a, b) => a + b);
    const docsOrders = await getAllOrders();
    const totalSend = docsOrders
      .map((item) => item.delivered && 1)
      .reduce((a, b) => a + b);
    const totalWait = docsOrders.length - totalSend;
    setMetrics({ totalSold, totalSend, totalWait, totalBalance });
    setTopFive(docsProd.slice(0, 5));
    setLoading(false);
  };
  useEffect(() => {
    calcTotales();
  }, []);
  const columns = [
    {
      title: "SKU/ISBN",
      dataIndex: "SKU",
      key: "sku",
      render: (text, record) => (
        <NavLink to={"/productdetail/" + record.key}>{text}</NavLink>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "Nombre",
      key: "nombre",
    },
    {
      title: "Vendidos",
      dataIndex: "Sold",
      align: "right",
      key: "sold",
    },
    {
      title: "Precio",
      dataIndex: "Precio",
      align: "right",
      key: "price",
    },
  ];
  
  return (
    <LayoutWithSider title="Dashboard" sidePanel={<DashboardSider selected={"1"}/>}>
      <div className="site-card-wrapper">
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Card type="inner" title="Ventas" style={{ borderRadius: 10 }}>
              <Skeleton loading={loading}>
                {`Productos:  ${metrics.totalSold}`}
                <Divider />
                {`Balance: $ ${metrics.totalBalance.toFixed(2)}`}
              </Skeleton>
            </Card>
          </Col>
          <Col span={12}>
            <Card type="inner" title="Pedidos" style={{ borderRadius: 10 }}>
              <Skeleton loading={loading}>
                {`Enviados:  ${metrics.totalSend}`}
                <Divider />
                {`En espera: ${metrics.totalWait}`}
              </Skeleton>
            </Card>
          </Col>
        </Row>
      </div>
      <PageHeader title="Los 5 más vendidos">
        <Table dataSource={topFive} columns={columns} loading={loading} />
      </PageHeader>
    </LayoutWithSider>
  );
}

export default DashboardPage;
