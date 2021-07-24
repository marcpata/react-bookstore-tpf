import { Button, List, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardSider from '../Components/DashboardSider';
import LayoutWithSider from '../Components/LayoutWithSider';
import { getAllProductsFromArray, getOrderById } from '../Services/Orders'
import { getUserByAttribute } from '../Services/Users';

function OrderPage(props) {
    const {orderId} = props.match.params
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        (async ()=>{
            setOrders([])
            const refOrder = await getOrderById(orderId)
            const userInfo = await getUserByAttribute('userId', refOrder.user)
            const {products} = refOrder
            const productsdetail = await getAllProductsFromArray(products)
            setOrders([{...refOrder,'products': productsdetail, 'userInfo': userInfo[0], 'orderId': orderId }]);
        })()
    },[orderId])

    const columns = [
        {
            title: 'SKU',
            dataIndex: 'SKU',
            key:'sku',
            render: (text,record)=><NavLink to={'/productdetail/'+record.productid}>{text}</NavLink>
        },
        {
            title: 'Nombre',
            dataIndex: 'Nombre',
            key:'nombre',
        },
        {
            title: 'Precio',
            dataIndex: 'Precio',
            key:'precio',
        },

    ]

    return (
        <LayoutWithSider title={`Orden Id: ${orderId.slice(-5)}`}
        sidePanel={<DashboardSider/>}
        >
            <List dataSource={orders}
            itemLayout="vertical"
            renderItem={(item)=>(
                <List.Item key={item.orderId}>
                    <List.Item.Meta title={`Usuario: ${item.userInfo.nombre} ${item.userInfo.Apellido||''}`}
                    description={(
                        <div key={item.orderId}>
                            <p>{`Fecha: ${new Date(item.date)}`}</p>
                            <p>Entregado: {item.delivered?'Sí':'No'}</p>
                        </div>
                    )}/>
                    <Table key={item.orderId} columns={columns} dataSource={item.products}/>
                </List.Item>
            )}
            />
            <Button><NavLink to="/orders">Regresar a pedidos</NavLink></Button>
        </LayoutWithSider>
    );
}

export default OrderPage;