import { Button, Divider, Input, Popconfirm, Space, Table, Form, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import LayoutWithSider from '../Components/LayoutWithSider'
import {deleteProduct, editProduct,  getAllProducts, getProductById} from '../Services/Products'
import DashboardSider from '../Components/DashboardSider'
import { NavLink } from 'react-router-dom';

function ProductsPage(props) {
    const [captionButton, setCaptionButton] = useState("Guardar")
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)   
    const [reload, setReload] = useState(false)
    const [loadingForm, setLoadingForm] = useState(false)
    const [form] = Form.useForm()
    const getOrders = async () => {
        setLoading(true)
        const docs = await getAllProducts()
        setProducts(docs)
        setLoading(false)
        setReload(false)
    }
    
    useEffect(() => {
        getOrders()
    }, [])

    useEffect(() => {
        if(reload) getOrders()
    }, [reload])
    
    const initValues = {
        "productId": '',
        "Nombre":"",
        "Cantidad": 0,
        "Descripción":"",
        "Precio":0,
        "SKU":"",
        "Sold":0,
        "destacado": false,
        "img": ""
    }


    const handleRemove = (item)=>{        
        deleteProduct(item)
        setReload(true)
    }

    const ActionRemove=(props)=>{
        const noQuitar = ['7notvE7ltKcAZrR9UPoF','FFdWXLDuSFOgmpZQziBL','KQpVs62ekbvQgPHfbcPU','zbnBMlA0qVcLvKI7NFu7']
        return !noQuitar.includes(props.id)?(
            <Popconfirm
                onConfirm={() => handleRemove(props.id)}
                title="Quiere borrar este producto del maestro?"
                okText="Sí"
                cancelText="No"
                style={{color: "red"}}
                key={props.id}
            >
                <Button>
                &nbsp;Quitar
                </Button>
            </Popconfirm>
        ):(
            <Button disabled>
                &nbsp;Quitar
            </Button>
        )
    } 
   

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
        {
            title: 'Acciones',
            key:'actions',
            render: (text, record)=>(
                <Space size="middle">
                    <ActionRemove id={record.id}/>
                    <Divider type="vertical" />
                    <Button onClick={(e)=>{e.preventDefault();handleEdit(record.id)}}>
                        Editar
                    </Button>
                </Space>
            )
        }

    ]

    const handleEdit = async (prodid) => {
        setLoadingForm(true)
        const prod = await getProductById(prodid)
        const { id, ...data } = prod
        const destacadoBool = data.destacado==="true"
        const fieldsData = {'productId': prodid, ...data, 'destacado': destacadoBool}
        form.setFieldsValue(fieldsData)
        setLoadingForm(false)
        setCaptionButton("Actualizar")
    }

    const handleForm=(values) => {
        setLoadingForm(true)
        editProduct({...values, 'destacado': values.destacado.toString()})
        onNew()
        setReload(true)
        setLoadingForm(false)
    }
    const handleChangeDestacado=(value) => {
        form.setFieldsValue({'destacado': value})
    }

    const onNew = () => {
        setCaptionButton("Guardar")
        form.resetFields()
    }

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };
    
    return (
        <LayoutWithSider title="Maestro de Productos" sidePanel={<DashboardSider selected="2"/>}>
            <Form  {...layout} form={form} initialValues={initValues} onFinish={handleForm} layout="horizontal">
                <Form.Item hidden name='productId'>
                    <Input/>
                </Form.Item>
                <Form.Item name="Nombre" label="Nombre">
                    <Input/>
                </Form.Item>
                <Form.Item name="Descripción" label="Descripción">
                    <Input/>
                </Form.Item>
                <Form.Item name="SKU" label="SKU">
                    <Input/>
                </Form.Item>
                <Form.Item name="Cantidad" label="Cantidad">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="Sold" label="Vendidos">
                    <Input type="number"/>
                </Form.Item>
                <Form.Item name="Precio" label="Precio">
                    <Input type="number"/>
                </Form.Item>
                <Form.Item name="destacado" valuePropName="checked" label="Destacado">                
                    <Switch onChange={handleChangeDestacado}/>
                </Form.Item>
                <Form.Item name="img" label="Imagen">
                    <Input placeholder="https://sitioweb.com/imagen.jpg"/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                <Button onClick={onNew} style={{margin:5}}>Nuevo</Button>
                <Button htmlType="submit" style={{margin:5}}type="primary" loading={loadingForm}>
                    {captionButton}
                </Button>
                </Form.Item>
            </Form>
            <Table dataSource={products} loading={loading} columns={columns}/>
        </LayoutWithSider>
    );
}

export default ProductsPage;