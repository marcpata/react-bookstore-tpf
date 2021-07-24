import { Layout, Menu } from "antd";
import {
  AuditOutlined,
  EditOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const DashboardSider = (props) => {
  const { Sider } = Layout;
  return (
    <Sider>
      <Menu
        theme="dark"
        selectedKeys={props.selected}
        mode="inline"
        defaultOpenKeys="3"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <NavLink to="/dashboard">Estadisticas</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<EditOutlined />}>
            <NavLink to="/products">Editar productos</NavLink>
        </Menu.Item>
        <Menu.SubMenu key="3" icon={<AuditOutlined />} title="Pedidos">
          <Menu.Item key="3_1">
            <NavLink to="/orders">Todos</NavLink>
          </Menu.Item>
          <Menu.Item key="3_2">
            <NavLink to="/orders/stand_by">Pendientes</NavLink>
          </Menu.Item>
          <Menu.Item key="3_3">
            <NavLink to="/orders/send">Enviados</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
}

export default DashboardSider