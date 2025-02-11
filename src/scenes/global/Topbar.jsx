import React from "react";
import { Layout, Typography } from "antd";
import { useTheme } from "../../theme";

const { Header } = Layout;

const Topbar = () => {
  const { theme } = useTheme();
  return (
    <Layout style={{margin: "0"}}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 210,
          padding: "0 20px",
          backgroundColor: theme.token.colorBgBase,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: theme.token.colorPrimary,
          }}
        >
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              fontWeight: "bold",
              letterSpacing: "4px",
              color: theme.token.colorPrimary,
            }}
          >
            ARABI
          </Typography.Title>
        </div>
      </Header>
    </Layout>
  );
};

export default Topbar;
