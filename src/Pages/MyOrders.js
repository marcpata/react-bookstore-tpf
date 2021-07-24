import { List, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LayoutWithSider from '../Components/LayoutWithSider';
import EcommerceContext from '../Context/EcommerceContext';
import { getOrdersByAttribute,getAllProductsFromArray } from '../Services/Orders'

function MyOrders(props) {
    const {userLogged,logged}=useContext(EcommerceContext);
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        if(logged){
            (async ()=>{
                const refOrder = await getOrdersByAttribute('user',userLogged.userId)
                setOrders([])
                refOrder.map(async data=>{
                    const {products} = data
                    const productsdetail = await getAllProductsFromArray(products)
                    setOrders((prev)=>[...prev,{...data,'products': productsdetail},]);
                    
                })
                
            })()
        }
    },[userLogged,logged])

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
        <LayoutWithSider title="Mis Pedidos" mode>
            <List dataSource={orders}
            itemLayout="vertical"
            renderItem={(item)=>(
                <List.Item key={item.orderId}>
                    <List.Item.Meta title={`Orden Id: ${item.orderId.slice(-8)}`}
                    description={(
                        <div>
                            <p>{`Fecha: ${new Date(item.date)}`}</p>
                            <p>Entregado: {item.delivered?'Sí':'No'}</p>
                        </div>
                    )}/>
                    <Table columns={columns} dataSource={item.products}/>
                </List.Item>
            )}
            />
        </LayoutWithSider>
    );
}

export default MyOrders;