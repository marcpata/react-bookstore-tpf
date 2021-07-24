import { PageHeader, Layout } from "antd";
import React from "react";

function LayoutWithSider(props) {
  const { Content } = Layout;

  return (
    <Layout>
      {props.sidePanel}
      <Layout
        className={props.sidePanel ? "main-container" : "main-container-form"}
      >
        {props.title && (
          <PageHeader title={props.title} avatar={props.avatar} />
        )}
        <Content className="site-layout-background container-page">
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutWithSider;
