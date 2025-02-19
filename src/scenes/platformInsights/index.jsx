import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, message } from "antd";
import PieChart from "../../components/PieChart";
import { useTheme } from "../../theme";
import axios from "axios";
import requests from "../../Requests";

const PlatformInsights = () => {
  const { theme } = useTheme();
  const { token } = theme;

  // State
  const [chartData, setChartData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("token");
        const bId = localStorage.getItem("businessId");

        if (!authToken || !bId) {
          message.error("Unauthorized: Missing credentials");
          return;
        }

        // Fetch data simultaneously
        const [chartResponse, alertsResponse] = await Promise.all([
          axios.get(requests["chatUsage"], {
            headers: { "x-access-token": authToken, "x-business-id": bId },
          }),
          axios.get(requests["peakUsage"], {
            headers: { "x-access-token": authToken, "x-business-id": bId },
          }),
        ]);

        // Transform data for PieChart
        setChartData(
          chartResponse.data.map((item) => ({
            id: item.channel,
            label: item.channel,
            value: item.count,
          }))
        );

        // Function to format hours correctly
        const formatHour = (timestamp) => {
          const date = new Date(timestamp);
          return String(date.getUTCHours()).padStart(2, "0");
        };

        // Find the latest (max) active_hour for each platform
        const latestAlerts = {};
        alertsResponse.data.forEach((item) => {
          const platform = item.channel;
          if (
            !latestAlerts[platform] || 
            new Date(item.active_hour) > new Date(latestAlerts[platform].active_hour)
          ) {
            latestAlerts[platform] = item; // Store the latest one
          }
        });

        // Format only the latest alerts
        setAlertsData(
          Object.values(latestAlerts).map((item) => {
            const startHour = formatHour(item.active_hour);
            const endHour = formatHour(
              new Date(item.active_hour).setHours(
                new Date(item.active_hour).getUTCHours() + 1
              )
            );

            return {
              channel: item.channel,
              message: `Peak usage detected on ${item.channel}: ${startHour}:00 - ${endHour}:00`,
              chat_count: item.chat_count,
            };
          })
        );
      } catch (error) {
        message.error("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      <Row gutter={[16, 16]}>
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
            <PieChart
              data={
                chartData.length > 0
                  ? chartData
                  : [{ id: "No Data", label: "No Data", value: 1 }]
              }
            />
          </Card>
        </Col>


        <Col xs={24} sm={24} md={12} lg={8}>
          <Card
            title="Peak Usage Alerts"
            bordered={false}
            style={{ height: "450px", overflowY: "auto" }}
          >
            {loading || alertsData.length > 0 ? (
              alertsData.map((alert, index) => (
                <Typography.Paragraph
                  key={index}
                  style={{ marginBottom: "10px" }}
                >
                  {alert.message}
                </Typography.Paragraph>
              ))
            ) : (
              <Typography.Paragraph>No Alerts Available</Typography.Paragraph>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlatformInsights;
