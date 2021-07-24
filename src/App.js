import { ConfigProvider, Layout } from "antd";
import "./App.css";

import React from "react";

import CatalogPage from "./Pages/CatalogPage";
import LoginPage from "./Pages/LoginPage";
import LogoutPage from "./Pages/LogoutPage";
import DetailPage from "./Pages/DetailPage";
// import ABMPage from "./Pages/ABMPage";
import GlobalState from "./Context/GlobalState";

import { BrowserRouter, Route } from "react-router-dom";
import MenuNavigate from "./Components/MenuNavigate";
import ShoppingCart from "./Pages/ShoppingCart";
import SignInPage from "./Pages/SignInPage";
import StepTwo from "./Pages/StepTwo";
import MyOrders from "./Pages/MyOrders";
import OrdersPage from "./Pages/OrdersPage";
import OrderPage from "./Pages/OrderPage";
import DashboardPage from "./Pages/DashboardPage";
import esEs from "antd/lib/locale/es_ES";
import ProductsPage from "./Pages/ProductsPage";

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <ConfigProvider locale={esEs}>
          <Layout style={{ minHeight: "100vh" }}>
            <MenuNavigate />
            <Route path="/" exact component={CatalogPage} />
            <Route path="/search/:search" component={CatalogPage} />
            <Route path="/des/:destacados" component={CatalogPage} />
            {/* <Route path="/ABM" component={ABMPage} /> */}
            <Route path="/productdetail/:id" component={DetailPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/shoppingcart" component={ShoppingCart} />
            <Route path="/myorders" component={MyOrders} />
            <Route path="/steptwo" component={StepTwo} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/orders" exact component={OrdersPage} />
            <Route path="/orders/:statusOrders" component={OrdersPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/order/:orderId" component={OrderPage} />
          </Layout>
        </ConfigProvider>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
