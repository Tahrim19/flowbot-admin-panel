import React from "react";
import { Typography, Row, Col, Card } from "antd";
import PieChart from "../../components/PieChart";
import { useTheme } from "../../theme"; // Assuming you're using your custom theme

const PlatformInsights = () => {
  // Mock alerts for peak usage
  const peakUsageAlerts = [
    "Peak usage detected on Web: 12:00 PM - 1:00 PM",
    "Peak usage detected on WhatsApp: 6:00 PM - 7:00 PM",
  ];

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
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Platform Insights
      </Typography.Title>
      <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
        Gain valuable insights into platform usage and trends across different
        platforms.
      </Typography.Paragraph>

      {/* Layout for Pie Chart and Alerts */}
      <Row gutter={[16, 16]}>
        {/* Breakdown of Chat Usage by Platform */}
        <Col xs={24} sm={24} md={12} lg={16}>
          <Card
            title="Breakdown of Chat Usage by Platform"
            bordered={false}
            style={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <PieChart />
          </Card>
        </Col>

        {/* Peak Usage Alerts */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            title="Peak Usage Alerts"
            bordered={false}
            style={{ height: "180px", overflowY: "auto" }}
          >
            {peakUsageAlerts.map((alert, index) => (
              <Typography.Paragraph key={index} style={{ marginBottom: "10px" }}>
                {alert}
              </Typography.Paragraph>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlatformInsights;
