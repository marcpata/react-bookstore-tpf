import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import LayoutWithSider from "../Components/LayoutWithSider";
import EcommerceContext from "../Context/EcommerceContext";

function LogoutPage() {
  const { logoutUser } = useContext(EcommerceContext);
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);
  const handleClick = () => history.push("/");

  const history = useHistory();
  return (
    <LayoutWithSider title="Gracias por su visita">
      <Button type="primary" onClick={handleClick}>Volver al inicio</Button>
    </LayoutWithSider>
  );
}

export default LogoutPage;
