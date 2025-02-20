import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, message, Spin } from "antd";
import AreaChart from "../../components/AreaChart";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import { useTheme } from "../../theme";
import requests from "../../Requests";
import axios from "axios";

const Dashboard = () => {
  const newUsers = "25";

  const { theme } = useTheme();
  const { token } = theme;

  const [loading, setLoading] = useState(false);
  const [totalChats, setTotalChats] = useState(0);
  const [uniqueUsers, setUniqueUsers] = useState(0);
  const [activeHours, setActiveHours] = useState(0);
  const [messageTrends, setMessageTrends] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [totalChatsDaily, setTotalChatsDaily] = useState([]);

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

        const headers = {
          headers: {
            "x-access-token": authToken,
            "x-business-id": bId,
          },
        };

        // fetch data simultaneously
        const [
          totalChatsDailyResponse,
          totalChatsResponse,
          uniqueUsersResponse,
          activeHoursResponse,
          messageTrendsResponse,
          sentimentResponse,
        ] = await Promise.all([
          axios.get(requests["totalChatsDaily"], headers),
          axios.get(requests["totalChats"], headers),
          axios.get(requests["uniqueUsers"], headers),
          axios.get(requests["activeHours"], headers),
          axios.get(requests["messageTrends"], headers),
          axios.get(requests["sentimentSummary"], headers),
        ]);

        const formattedData = [
          {
            id: "message trends",
            color: "hsl(205, 70%, 50%)",
            data: messageTrendsResponse.data.map((item) => ({
              x: new Date(item.day).toLocaleDateString("en-US", {
                weekday: "short",
              }), // Convert to "Mon", "Tue"

              y: parseFloat(item.message_count), // Ensure it's a number
            })),
          },
        ];

        const formattedChats = [
          {
            id: "message trends",
            color: "hsl(205, 70%, 50%)",
            data: totalChatsDailyResponse.data.map((item) => ({
              x: new Date(item.day).toLocaleDateString("en-US", {
                weekday: "short",
              }), // Convert to "Mon", "Tue"

              y: parseFloat(item.total_chats), // Ensure it's a number
            })),
          },
        ];

        setTotalChatsDaily(formattedChats);

        setTotalChats(totalChatsResponse.data.map((item) => item.total_chats));
        setUniqueUsers(
          uniqueUsersResponse.data.map((item) => item.unique_users)
        );
        setActiveHours(
          activeHoursResponse.data.map((item) => item.active_hours)
        );
        setMessageTrends(formattedData);
        setSentimentData(
          sentimentResponse.data.map((item) => ({
            id: item.count,
            label: item.sentiment ? item.sentiment : "Unknown",
            value: item.count,
          }))
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
                Total Chats (Daily)
              </Typography.Text>
            }
            style={{
              height: "450px",
              marginBottom: "20px",
              backgroundColor: token.colorBgContainer, // Using base background color for cards
            }}
          >
            <div style={{ marginTop: "-50px" }}>
              {loading ? (
                <Spin size="large" />
              ) : (
                <AreaChart
                  data={totalChatsDaily}
                  legendX="Day"
                  legendY="Count"
                  minX="100"
                  maxY="0"
                />
              )}
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

            {/* New Users */}
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
                <Typography.Title level={5}>New Users</Typography.Title>
                <Typography level={3} style={{ color: token.colorPrimary }}>
                  {newUsers}
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
            <div style={{ marginTop: "-28px" }}>
              {loading ? (
                <Spin size="large" />
              ) : (
                <PieChart data={sentimentData} />
              )}
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
            {loading ? (
              <Spin size="large" />
            ) : (
              <LineChart
                data={messageTrends}
                legendX="Days"
                legendY="Count"
                minX="1"
                minY="100"
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
