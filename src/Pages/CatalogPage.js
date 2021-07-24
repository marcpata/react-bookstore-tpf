import {
  List,
  Skeleton,
  Image,
  Row,
  Col,
  Popconfirm,
  message,
  Modal,
  Switch,
  Layout
} from "antd";
import { ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useContext } from "react";
import { getAllProducts, getProductsByAttribute } from "../Services/Products";
import Login from "../Components/Login";
import EcommerceContext from "../Context/EcommerceContext";
import LayoutWithSider from "../Components/LayoutWithSider";
import { NavLink } from "react-router-dom";

function CatalogPage(props) {
  const {Sider} = Layout
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const {destacados, search}={ destacados: false, search: "", ...props.match.params }
  const [destacadosState, setDestacadosState] = useState(destacados)
  const miStyle = { minHeight: "350px", maxWidth: "700px", textAlign: "left" };
  const { logged, addToCart } = useContext(EcommerceContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const libros = destacadosState
        ? await getProductsByAttribute("destacado", true)
        : await getAllProducts();
      
      
      setLibros(search!==""?libros.filter(item=>item.Nombre.toLowerCase().includes(search.toLowerCase())):libros);
      setLoading(false);
    })();
  }, [destacados,destacadosState, search]);

  const handleAddShopCart = (id) => {
    message.success("Se agregó el producto a su compra!");
    addToCart(id);
  };

  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setVisibleModal(true);
  };
  const handleCancel = () => {
    setVisibleModal(false);
  };
  const urlEmpty=""

  const ActionShop = (props) =>
    props.isLogged ? (
      <Popconfirm
        onConfirm={() => handleAddShopCart(props.id)}
        title="Quiere agregar el articulo al carrito?"
        okText="Sí"
        cancelText="No"
        icon={<ShoppingCartOutlined />}
        key={props.id}
      >
        <a key={props.id} href={urlEmpty}>
          <ShoppingCartOutlined />
          &nbsp;Comprar
        </a>
      </Popconfirm>
    ) : (
      <div>
        
        <a key={props.id} onClick={showModal} href={urlEmpty}>
          <ShoppingCartOutlined />
          &nbsp;Comprar
        </a>
      </div>
    );

    const SidePanel = (props)=>(
      <Sider width={200} style={{padding:20,backgroundColor: "grey"}}>
          <div>
            <span style={{fontWeight:"bolder",color: "white"}}>Destacados</span>
            &nbsp;<Switch defaultChecked={destacadosState} onClick={value=>setDestacadosState(value)}/>
          </div>
      </Sider>
    )

  return (
    
    <LayoutWithSider title={(!destacadosState?'Nuestro catalogo':'Destacados')}
    sidePanel={<SidePanel/>}>
      <Modal
          visible={visibleModal}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={handleCancel}
        >
          <h1>Inicia sesión</h1>
          <Login handleLogin={()=>setVisibleModal(false)}/>
        </Modal>
      <List
        loading={loading}
        style={miStyle}
        itemLayout="vertical"
        dataSource={libros}
        renderItem={(libro) => (
          <List.Item
            actions={[
              <div>
                <DollarOutlined />
                &nbsp;{libro.Precio}
              </div>,
                <NavLink to={`/productdetail/${libro.id}`}>
                Detalle
                </NavLink>,
              <ActionShop id={libro.id} isLogged={logged} />,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                title={libro.Nombre}
                description={`Cantidad en stock: ${libro.Cantidad}`}
              />
              <div>
                <Row align="middle">
                  <Col span={8} md={4}>
                    <Image width={100} src={libro.img} />
                  </Col>
                  <Col span={20}>{libro.Descripción}</Col>
                </Row>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </LayoutWithSider>
  );
}

export default CatalogPage;
