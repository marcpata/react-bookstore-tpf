import { Row , Steps, Form, Input, Button} from 'antd';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import LayoutWithSider from '../Components/LayoutWithSider';
import EcommerceContext from '../Context/EcommerceContext';
import {addOrder} from '../Services/Orders'

function StepTwo(props) {
    const {Step}=Steps
    const { clearCart, shoppingCart, userLogged } = useContext(EcommerceContext)
    const [finished, setFinished] = useState(false)
    const history = useHistory()
    const fieldsForm = [
        {label: 'Ciudad',
        name: 'city',
        initValue: '',
        rules: {
            required: true
        }},
        {label: 'Provincia',
        name: 'providence',
        initValue: '',
        rules: {
            required: true
        }},
        {label: 'Calle/Altura',
        name: 'street',
        initValue: '',
        rules: {
            required: true
        }},
        {label: 'Aclaraciones',
        name: 'extradata',
        initValue: '',
        rules: {
            
        }}
    ]
    const handleSubmit= async (values)=>{
        console.log(...shoppingCart)
        const checkoutDate = new Date()
        addOrder({'user':userLogged.userId, 'date': checkoutDate.getTime(), 'delivered': false,'shippingInfo': {...values}, 'products': [...shoppingCart]})
        clearCart();
        setFinished(true)
    }
    const handleBack=()=>{
        history.push("/")
    }

    return (
            <LayoutWithSider title={!finished?("Dirección de envío"):'Gracias por su compra'}>
                <Steps current={!finished?1:2}>
                    <Step title='Carrito' description='Control de productos'/>
                    <Step title='Pago/Envío' description='Dirección de entrega'/>
                    <Step title='Finalización' description='Compra completada'/>
                        
                </Steps>
                <Row justify="center">

                </Row>
                {!finished?(
                <Form
                onFinish={handleSubmit}
                name="form" validateMessages={{
                    // eslint-disable-next-line
                    required: 'Por favor ingrese su ${label}!!'
                }}
                layout="vertical">
                   {fieldsForm.map(
                       item=>
                       <Form.Item key={item.name} initialValue={item.initValue} label={item.label} name={item.name} rules={[item.rules]}>
                           <Input placeholder={item.label}/>
                       </Form.Item>
                   )}
                   <Button type="primary" htmlType="submit">Finalizar Compra</Button>
                </Form>
                ):
                <Row justify="center" style={{marginTop:'30px'}}>
                    <Button type="primary" htmlType="submit" onClick={handleBack}>Volver al inicio</Button>
                </Row>
                }
            </LayoutWithSider>
    );
}

export default StepTwo;