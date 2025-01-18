import React from "react";
import { Row, Col, Card, Typography } from "antd";
import AreaChart from "../../components/AreaChart";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import { useTheme } from "../../theme";

const Dashboard = () => {
  // Mock data for overview metrics
  const totalChats = 12000;
  const uniqueUsers = 4500;
  const activeHours = "9 AM - 6 PM";
  const costSavingsEstimate = "$25,000";

  const { theme } = useTheme();
  const { token } = theme;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: token.colorBgBase,
        color: token.colorTextBase,
        marginLeft: "210px",
      }}
    >
      <Typography.Title
        level={2}
        style={{
          marginBottom: "2rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Dashboard
      </Typography.Title>

      {/* First Row: Area Chart + Overview Metrics */}
      <Row gutter={[20, 20]}>
        {/* Area Chart Section */}
        <Col xs={24} md={15}>
          <Card
            title={
              <Typography.Text strong style={{ paddingBottom: "-50px" }}>
                Total Chats (Daily/Weekly/Monthly)
              </Typography.Text>
            }
            style={{
              height: "450px",
              marginBottom: "20px",
              backgroundColor: token.colorBgContainer, // Using base background color for cards
            }}
          >
            <div style={{ marginTop: "-50px" }}>
              <AreaChart />
            </div>
          </Card>
        </Col>

        {/* Overview Metrics Section (4x1 Grid) */}
        <Col xs={24} md={9}>
          <Row gutter={[16, 16]}>
            {/* Total Chats */}
            <Col xs={24}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: token.colorBgContainer, // Using theme's base background color
                  textAlign: "center",
                  padding: "5px", // Reduced padding to decrease height
                  height: "100px", // Fixed height for a smaller card
                }}
              >
                <Typography.Title level={5}>Total Chats</Typography.Title>
                <Typography level={3} style={{ color: token.colorPrimary }}>
                  {totalChats}
                </Typography>
              </Card>
            </Col>

            {/* Unique Users */}
            <Col xs={24}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: token.colorBgContainer, // Base color
                  textAlign: "center",
                  padding: "5px", // Reduced padding to decrease height
                  height: "100px", // Fixed height for a smaller card
                }}
              >
                <Typography.Title level={5}>Unique Users</Typography.Title>
                <Typography level={3} style={{ color: token.colorPrimary }}>
                  {uniqueUsers}
                </Typography>
              </Card>
            </Col>

            {/* Active Hours */}
            <Col xs={24}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: token.colorBgContainer, // Base color
                  textAlign: "center",
                  padding: "5px", // Reduced padding to decrease height
                  height: "100px", // Fixed height for a smaller card
                }}
              >
                <Typography.Title level={5}>Active Hours</Typography.Title>
                <Typography level={3} style={{ color: token.colorPrimary }}>
                  {activeHours}
                </Typography>
              </Card>
            </Col>

            {/* Cost Savings */}
            <Col xs={24}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: token.colorBgContainer, // Base color
                  textAlign: "center",
                  padding: "5px", // Reduced padding to decrease height
                  height: "100px", // Fixed height for a smaller card
                }}
              >
                <Typography.Title level={5}>Cost Savings</Typography.Title>
                <Typography level={3} style={{ color: token.colorPrimary }}>
                  {costSavingsEstimate}
                </Typography>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Second Row: Pie Chart + Line Chart */}
      <Row gutter={[16, 16]}>
        {/* Pie Chart Box */}
        <Col xs={24} sm={12} md={10}>
          <Card
            bordered={false}
            title="Sentiment Analysis Summary"
            style={{
              height: "400px",
              backgroundColor: token.colorBgContainer,
            }}
          >
            <div style={{marginTop:'-28px'}}>

            <PieChart />
            </div>

          </Card>
        </Col>

        {/* Line Chart Box */}
        <Col xs={24} sm={12} md={14}>
          <Card
            bordered={false}
            title="Message Count Trends"
            style={{
              height: "400px",
              backgroundColor: token.colorBgContainer,
            }}
          >
            <LineChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
