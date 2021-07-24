import { Divider, List, Skeleton, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardSider from "../Components/DashboardSider";
import LayoutWithSider from "../Components/LayoutWithSider";
import {
  getAllOrders,
  getOrdersByAttribute,
  updateOrderStatus,
} from "../Services/Orders";

function OrdersPage(props) {
  const [orders, setOrders] = useState([]);
  const [reloadOrders, setReloadOrders] = useState(false);
  const [loading, setLoading] = useState(false);
  const { statusOrders } = props.match.params;

  const getOrders= async () => {
    setLoading(true);
    switch (statusOrders) {
      case "stand_by":
        setOrders(await getOrdersByAttribute("delivered", false));
        break;
      case "send":
        setOrders(await getOrdersByAttribute("delivered", true));
        break;
      default:
        setOrders(await getAllOrders());
        break;
    }
    setLoading(false);
    setReloadOrders(false);
  }

  useEffect(() => {
    getOrders()
    // eslint-disable-next-line
  }, [statusOrders]);
  
  useEffect(() => {
    if (reloadOrders) getOrders()
    // eslint-disable-next-line
  }, [reloadOrders]);

  const TitleOrder = (props) => (
    <div>
      Orden:&nbsp;{props.orderId.slice(-5)}
      <Divider type="vertical" />
      <Tag color={props.value ? "green" : "orange"}>
        {props.value ? "Enviado" : "Solicitado"}
      </Tag>
    </div>
  );
  const AddressOrder = (props) => {
    const { providence, city, street } = props.data;
    return (
      <div>
        {`Dirección de envío: ${providence},${city},${street}`}
        <Divider type="vertical" />
        {`Cantidad de items: ${props.items.length}`}
      </div>
    );
  };
  const handleChangeStatus = async (evt, item) => {
    evt.preventDefault();
    const { orderId, delivered } = item;
    await updateOrderStatus(orderId, !delivered);
    setReloadOrders(true);
  };

  const selectedItem = {
    stand_by: "3_2",
    send: "3_3",
  };

  return (
    <LayoutWithSider
      title="Pedidos"
      sidePanel={
        <DashboardSider selected={selectedItem[statusOrders] || "3_1"} />
      }
    >
      <List
        dataSource={orders}
        itemLayout="vertical"
        loading={loading}
        renderItem={(item) => (
          <Skeleton loading={loading}>
            <List.Item
              actions={[
                <a href="/" onClick={(e) => handleChangeStatus(e, item)}>
                  Marcar como {item.delivered ? "Solicitado" : "Enviado"}
                </a>,
                <NavLink to={`/order/${item.orderId}`}>Detalle</NavLink>,
              ]}
            >
              <List.Item.Meta
                title={
                  <TitleOrder orderId={item.orderId} value={item.delivered} />
                }
                description={`Fecha: ${new Date(item.date)}`}
              />
              <AddressOrder data={item.shippingInfo} items={item.products} />
            </List.Item>
          </Skeleton>
        )}
      />
    </LayoutWithSider>
  );
}

export default OrdersPage;
