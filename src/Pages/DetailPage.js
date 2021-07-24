import { Image,Layout, Row, Col, Button, message, Divider} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import LayoutWithSider from '../Components/LayoutWithSider';
import { getProductById } from '../Services/Products';
import EcommerceContext from '../Context/EcommerceContext'
import Login from '../Components/Login'
import Modal from 'antd/lib/modal/Modal';



function DetailPage(props) {
    const {addToCart, logged }=useContext(EcommerceContext)
    const {Content} = Layout
    const [product, setProduct] = useState({})
    const [visibleModal, setVisibleModal] = useState(false);
    const {id} = props.match.params
    useEffect(()=>{
        (async()=>{
            const doc = await getProductById(id)
            setProduct(doc)
        }
        )()
    },[id]
    )
    const handleAddShopCart = () => {
        if(!logged) {
            setVisibleModal(true);
            return
        }

        message.success("Se agregó el producto a su compra!");
        addToCart(id);
      };
    const handleCancel=()=>{
        setVisibleModal(false)
    }
    
    return (
        <LayoutWithSider title={product.Nombre}>
            <Modal
                visible={visibleModal}
                okButtonProps={{ style: { display: "none" } }}
                onCancel={handleCancel}
            >
                <h1>Inicia sesión</h1>
                <Login handleLogin={()=>setVisibleModal(false)}/>
            </Modal>
            <Row justify="center">
                <Col>
            <Image src={product.img}/>
                </Col>
                <Col style={{paddingLeft:20}}>
            <Content style={{border:"1px solid #c0c0c0", padding: 12, minWidth:300 ,borderRadius:"10px"}}>
                <p style={{fontSize: '18pt'}}>Precio: $ {String(product.Precio)?.indexOf('.')>-1?String(product.Precio).split('.')[0]:'0'}
                <span style={{fontSize: "12pt",verticalAlign:"super"}}>{String(product.Precio)?.indexOf('.')>-1?String(product.Precio).split('.')[1]:'00'}</span>
                </p>
                <p>SKU: {product.SKU}</p>
                <p>Cantidad disponible: {product.Cantidad}</p>
                <Button type="primary" onClick={handleAddShopCart}>Comprar</Button>
            </Content>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col>
                {product.Descripción}
                </Col>
            </Row>
        </LayoutWithSider>
    );
}

export default DetailPage;