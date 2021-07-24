import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, List, Skeleton, Modal,Popconfirm, message } from 'antd';
import EcommerceContext from '../Context/EcommerceContext';
import {  getProductById } from '../Services/Products'
import LayoutWithSider from '../Components/LayoutWithSider';
import { useHistory } from 'react-router';
import Login from '../Components/Login';
import {ShoppingCartOutlined} from '@ant-design/icons'

function ShoppingCart() {
    
    const { shoppingCart, logged, removeFromCart } = useContext(EcommerceContext)

    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [productsToShop, setProductsToShop] = useState([])
    const [totalState, setTotalState] = useState(0)
    const [visibleModal, setVisibleModal] = useState(false)
    
    useEffect(()=>{
        setLoading(true)
        setProductsToShop([])
        setTotalState(0)
        let totalTmp=0;
        shoppingCart.map(async (item)=>{
            const doc = await getProductById(item.product);
            setProductsToShop((prev)=>[...prev, {...doc}])
            totalTmp+=Number(doc.Precio)
            setTotalState(totalTmp)
        })
        setLoading(false)
    }

    ,[shoppingCart,])

    const handleRemove = (id)=>{
        message.error("Se eliminó el producto de su carrito")
        removeFromCart(id)
    }

    const showModal = (evt)=>{
        evt.preventDefault()
        setVisibleModal(true)
    }

    const ActionRemove=(props)=>{
        return props.isLogged?(
            <Popconfirm
                onConfirm={() => handleRemove(props.id)}
                title="Quiere quitar el articulo del carrito?"
                okText="Sí"
                cancelText="No"
                style={{color: "red"}}
                icon={<ShoppingCartOutlined />}
                key={props.id}
            >
                <a key={props.id} href="/">
                &nbsp;Quitar
                </a>
            </Popconfirm>
        ):(
            <a key={props.id} onClick={showModal} href="/">
                &nbsp;Quitar
            </a>
        )
    }

    const handleClick=()=>{
        if(!logged) {
            setVisibleModal(true)
            return
        }

        history.push("/steptwo")
    }
    const  handleCancel=() => {
        setVisibleModal(false)
    }
    
    return (
       <EcommerceContext.Consumer>
           {(context)=>(
               <LayoutWithSider title="Carrito">
                    <Modal
                        visible={visibleModal}
                        okButtonProps={{ style: { display: "none" } }}
                        onCancel={handleCancel}
                    >
                        <h1>Inicia sesión</h1>
                        <Login handleLogin={()=>setVisibleModal(false)}/>
                    </Modal>
                   <List dataSource={productsToShop} itemLayout="horizontal"
                   loading={loading}
                //    locale={{emptyText:"No hay productos aún en su carrito"}}
                   renderItem={(product)=>(
                    <Skeleton avatar title={false} loading={loading} active>
                       <List.Item key={product.id} actions={[
                        // <a href="/" onClick={(e)=>{e.preventDefault();context.removeFromCart(product.id)}}>Quitar</a>]}>
                        <ActionRemove id={product.id} isLogged={context.logged}/>]}>
                           <List.Item.Meta avatar={<img src={product.img} width={60} alt={product.Nombre}/>}
                           title={product.Nombre}
                           description={product.Descripción}/>
                           $ {product.Precio}
                       </List.Item>
                    </Skeleton>
                   )
       
                   }/>
                   {totalState>0&&
                   <div>
                       <Divider/>
                       <p style={{fontSize:"24pt"}}>
                           Total: $
                           {String(totalState)?.indexOf('.')>-1?String(totalState).split('.')[0]:'0'}
                           <span style={{fontSize:"12pt", verticalAlign: "super"}}>{String(totalState)?.indexOf('.')>-1?String(totalState).split('.')[1]:'00'}</span>
                       </p>
                    <Button onClick={handleClick}>Continuar Compra</Button>
                   </div>
                   }
               </LayoutWithSider>
           )}
        </EcommerceContext.Consumer>
    );
}

export default ShoppingCart;