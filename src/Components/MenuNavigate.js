import React from 'react';
import { Menu, Badge, Row, Input, Layout } from 'antd'
import EcommerceContext from '../Context/EcommerceContext';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {
    ShoppingCartOutlined,
    ShoppingOutlined,
    StarOutlined,
    ToolTwoTone,
    UserAddOutlined,
    UserOutlined,
  } from "@ant-design/icons";

function MenuNavigate(props) {
    const {Search} = Input
    const location = useLocation();
    const history = useHistory();
    const {Header} = Layout
    const paths = {
        "/": "home",
        "/login": "login",
        "/signin": "signin",
        "/logout": "logout",
        "/des/true" : "des",
        "/shoppingcart": "shoppincart"
    }
    return (
        <EcommerceContext.Consumer>{(context)=>
            <>
            <Header className="header">
            <Row>
              <div className="logo">
                <span
                  style={{
                    fontSize: 24,
                    fontFamily: "Courier",
                    fontWeight: "bolder",
                  }}
                >
                  La Libreria
                </span>
              </div>
              <Search
                placeholder="Ingrese su busqueda"
                style={{ width: 300, marginTop: 15 }}
                onSearch={(value)=>history.push(`/search/${value}`)}
              />
            </Row>
          </Header>
          <Header className="header">
            <div>
                <Menu
                mode="horizontal"
                selectedKeys={paths[location.pathname]}
                className="toolbar"
                >
                <Menu.Item key="home">
                    <NavLink to="/" exact>
                    Catálogo
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="des" icon={<StarOutlined />}>
                    <NavLink to="/des/true" exact>
                    Destacados
                    </NavLink>
                </Menu.Item>
                {!context.logged&&(<Menu.Item key='signin' icon={<UserAddOutlined />}>
                    <NavLink to="/signin">Crea tu cuenta</NavLink>
                </Menu.Item>)}
                {!context.logged?(<Menu.Item key='login' icon={<UserOutlined />}>
                    <NavLink to="/login">Ingresá</NavLink>
                </Menu.Item>):(
                <Menu.SubMenu key="user" title={context.userLogged.nombre} icon={<UserOutlined/>}>
                    <Menu.Item key="user1" icon={<ShoppingCartOutlined/>}>
                        <NavLink to="/shoppingcart">Tu Carrito</NavLink>
                    </Menu.Item>
                    <Menu.Item key="user2" icon={<ShoppingOutlined/>}>
                        <NavLink to="/myorders">Tus Pedidos</NavLink>
                    </Menu.Item>
                    <Menu.Item key="user3" icon={<ToolTwoTone/>}>
                        <NavLink to="/Dashboard">Administración</NavLink>
                    </Menu.Item>

                    <Menu.Divider key="divider"/>
                    <Menu.Item key="user4" icon={<UserOutlined/>}>
                        <NavLink to="/logout">Salir</NavLink>
                    </Menu.Item>
                </Menu.SubMenu>
                    
                )}
                <Menu.Item key="shoppingcart" icon={<Badge count={context.shoppingCart.length} size="small">
                    <ShoppingCartOutlined />
                    </Badge>}>
                        <NavLink to="/shoppingcart">
                    Carrito
                        </NavLink>
                </Menu.Item>                
                </Menu>
            </div>
          </Header>
          </>
            }
        </EcommerceContext.Consumer>
    );
}

export default MenuNavigate;