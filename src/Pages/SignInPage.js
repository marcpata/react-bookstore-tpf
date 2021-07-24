import React, { useState } from "react";
import firebase from "../Config/firebase";
import { Button, Form, Input, Alert, Row } from "antd";
import LayoutWithSider from "../Components/LayoutWithSider";

function SignInPage() {

  const [errorDiv, setErrorDiv] = useState('');

  const handleSubmit = async (values) => {
    try {
      const { email, password, confirm, ...perfil } = values;
      const responseUser = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await firebase.db.collection("usuarios").add({
        userId: responseUser.user.uid,
        ...perfil,
      });

      window.location = "/login";
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case "auth/weak-password":
          setErrorDiv("La contraseña es debil");
          break;
        case "auth/email-already-in-use":
          setErrorDiv("El usuario/email ya existe");
          break;
        default:
          setErrorDiv(e.code);
          break;
      }
    }
  };

  const validateMessages = {
    // eslint-disable-next-line
    required: "Por favor ingrese su ${label}!!",
    types: {
      // eslint-disable-next-line
      email: "${label} no es un correo valido!",
    },
  };

  const initialValues={
    'nombre':'',
    'apellido':'',
    'email': '',
    'telefono':'',
    'password':'',
    'confirm':''
  }

  return (
    <LayoutWithSider avatar={{src:'https://icons.iconarchive.com/icons/icons8/windows-8/64/Users-Add-User-icon.png'}} title="Crea tu usuario">
      <Row justify="center">
        <Form
          name="register"
          onFinish={handleSubmit}
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 14,
          }}
          validateMessages={validateMessages}
          initialValues={initialValues}
          scrollToFirstError
        >
          {errorDiv !== "" && (
              <Alert message="Error" description={errorDiv} type="error" style={{marginTop: 5, textAlign:'left'}} showIcon/>
            )}
          <Form.Item
            name="nombre"
            label="Nombre"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="apellido" label="Apellido">
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            hasFeedback
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="telefono" label="Teléfono">
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Contraseña"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirme Contraseña"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor, confirme su contraseña!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las dos contraseñas no coinciden!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 1,
            }}
          >
            <Button type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Row>

    </LayoutWithSider>
  );
}

export default SignInPage;
