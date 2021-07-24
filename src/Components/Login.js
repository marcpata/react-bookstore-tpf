import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../Config/firebase";
import "antd/dist/antd.css";
import { Alert, Button, Form, Input } from "antd";
import EcommerceContext from "../Context/EcommerceContext";


const Login = (props) => {
  const { loginUser, userInfo } = useContext(EcommerceContext);

  const [errorDiv, setErrorDiv] = useState("");

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const responseUser = await firebase.auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      const docs = await firebase.db
        .collection("usuarios")
        .where("userId", "==", responseUser.user.uid)
        .get();
      userInfo(docs.docs[0]?.data());
      loginUser();
      props.handleLogin?props.handleLogin():history.push("/");
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          setErrorDiv("Correo o contraseña incorrectos");
          break;

        default:
          setErrorDiv(e.message);
          break;
      }
    }
  };

  const validateMessages = {
    // eslint-disable-next-line
    required: 'Por favor ingrese su ${label}!!',
    types: {
      // eslint-disable-next-line
      email: '${label} no es un correo valido!',
    },
  };

  return (
    <div>
      <Form
        name="form"
        layout="vertical"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        {errorDiv !== "" && (
          <Alert message="Error" description={errorDiv} type="error" style={{marginTop: 5, textAlign:'left'}} showIcon/>
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input placeholder="Ingrese su Correo" />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password placeholder="Ingrese su Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;