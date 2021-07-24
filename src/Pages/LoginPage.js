import React from 'react';
import Login from '../Components/Login'
import LayoutWithSider from '../Components/LayoutWithSider';
import { Row } from 'antd';

function LoginPage() {
  return (
    <LayoutWithSider title="Bienvenido!" avatar={{src: 'https://icons.iconarchive.com/icons/icons8/android/64/Users-User-icon.png'}} style={{maxWidth: "500", minWidth: 400}}>
      <Row justify="center">
      <Login/>
      </Row>
    </LayoutWithSider>
  );
}

export default LoginPage;