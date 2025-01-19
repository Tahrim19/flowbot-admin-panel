import React from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import {
  DashboardOutlined,
  MessageOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  BulbOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  // NotificationOutlined,
  FileDoneOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import { useTheme } from "../../theme"; // Use theme context to access the current theme
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Sider } = Layout;

const Sidebar = ({ setIsAuthenticated }) => {
  const [selectedKey, setSelectedKey] = useLocalStorage("selectedMenuItem", 1);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    if (selectedKey === "11") {
      localStorage.clear();
      console.log('logged out')
      if (setIsAuthenticated) {
        setIsAuthenticated(false);
      }
      navigate("/login");
    }
  };
  
  // Define the menu items array
  const menuItems = [
    { key: "1", icon: <DashboardOutlined />, label: "Dashboard", to: "/" },
    {
      key: "2",
      icon: <MessageOutlined />,
      label: "Chat Sessions",
      to: "/chatSessions",
    },
    { key: "3", icon: <TeamOutlined />, label: "Users", to: "/users" },
    {
      key: "4",
      icon: <FileTextOutlined />,
      label: "Documents",
      to: "/documents",
    },
    {
      key: "5",
      icon: <BarChartOutlined />,
      label: "Analytics",
      to: "/analytics",
    },
    {
      key: "6",
      icon: <BulbOutlined />,
      label: "Sentiment Analysis",
      to: "/sentimentAnalysis",
    },
    {
      key: "7",
      icon: <FundProjectionScreenOutlined />,
      label: "Platform Insights",
      to: "/platformInsights",
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      label: "Integrations",
      to: "/settings",
    },
    // { key: "9", icon: <NotificationOutlined />, label: "Alerts", to: "/alerts" },
    { key: "9", icon: <FileDoneOutlined />, label: "Reports", to: "/reports" },
    {
      key: "10",
      icon: <QuestionCircleOutlined />,
      label: "Help & Support",
      to: "/help",
    },
    {
      key: "11",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  // Map over the menu items array to create menu items dynamically
  const mappedMenuItems = menuItems.map((item) => ({
    key: item.key,
    icon: React.cloneElement(item.icon, {
      style: { color: theme.token.colorPrimary, fontSize: "18px" },
    }),
    label: (
      <Link
        to={item.to}
        style={{
          color: theme.token.colorTextBase,
          // fontWeight: "bold",
        }}
      >
        {item.label}
      </Link>
    ),
  }));

  return (
    <Sider
      width={210}
      style={{
        height: "100%",
        position: "fixed",
        overflowY: "auto",
        backgroundColor: theme.token.colorBgBase, // Background from theme
        borderRight: `1px solid ${theme.token.colorBgContainer}`, // Subtle border
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Subtle shadow
      }}
    >
      {/* Profile Section */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <div className="avatar-div">
          <Avatar
            size={64}
            src={userImage}
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              border: `2px solid ${theme.token.colorPrimary}`, // Avatar border
            }}
          />
        </div>
        <Typography.Text
          style={{
            color: theme.token.colorTextBase, // Text color from theme
            fontWeight: "bold",
          }}
        >
          User
        </Typography.Text>
      </div>

      {/* Menu Items */}
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        style={{
          backgroundColor: theme.token.colorBgBase, // Menu background from theme
          color: theme.token.colorTextBase, // Menu text color
          border: "none", // Remove default borders
        }}
        items={mappedMenuItems} // Use `items` instead of `children`
      />
    </Sider>
  );
};

export default Sidebar;
