import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, message, Spin } from "antd";
import LineChart from "../../components/LineChart";
import { useTheme } from "../../theme";
import axios from "axios";
import requests from "../../Requests";
// const { Option } = Select;

const Analytics = () => {
  const { theme } = useTheme();
  const { token } = theme;
  // const [timeframe, setTimeframe] = useState("weekly");
  const [loading, setLoading] = useState(false);

  // API Data States
  const [keywords, setKeywords] = useState([]);
  const [fallback, setFallback] = useState("");
  const [queryAccuracy, setQueryAccuracy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const authToken = localStorage.getItem("token");
      const bId = localStorage.getItem("businessId");

      if (!authToken || !bId) {
        message.error("Unauthorized: Missing credentials");
        setLoading(false);
        return;
      }

      try {
        const [keywordResponse, fallbackResponse, accuracyResponse] =
          await Promise.all([
            axios.get(requests["keywords"], {
              headers: { "x-access-token": authToken, "x-business-id": bId },
            }),
            axios.get(requests["fallbackRate"], {
              headers: { "x-access-token": authToken, "x-business-id": bId },
            }),
            axios.get(requests["queryAccuracy"], {
              headers: { "x-access-token": authToken, "x-business-id": bId },
            }),
          ]);

        const formattedQueryAccuracy = [
          {
            id: "Query Accuracy",
            color: "hsl(205, 70%, 50%)",
            data: accuracyResponse.data.map((item) => ({
              x: new Date(item.day).toLocaleDateString("en-US", { weekday: "short" }), // Convert to "Mon", "Tue"
              y: parseFloat(item.avg_accuracy), // Ensure it's a number
            })),
          },
        ];
        

        setKeywords(keywordResponse.data.map((item) => item.keyword) || []);
        setFallback(
          fallbackResponse.data.map((item) =>
            parseFloat(item.fallback_rate_percentage).toFixed(2)
          ) || ["0.00"]
        );
        setQueryAccuracy(formattedQueryAccuracy); 

        // console.log("Query Accuracy (Formatted):", formattedQueryAccuracy);
      } catch (error) {
        message.error("Failed to fetch analytics data.");
        console.error("API Error:", error);
      }

      setLoading(false);
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
        Analytics
      </Typography.Title>
      <Typography.Text style={{ marginBottom: "1.5rem", display: "block" }}>
        Gain insights into query accuracy, fallback rates, and keyword trends.
      </Typography.Text>

      {/* Timeframe Filter */}
      {/* <div
        style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
      >
        <Typography.Text strong style={{ marginRight: "16px" }}>
          Filter by Timeframe:
        </Typography.Text>
        <Select
          value={timeframe}
          onChange={setTimeframe}
          style={{ minWidth: "200px" }}
        >
          <Option value="daily">Daily</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
        </Select>
      </div> */}

      {loading ? (
        <Spin
          size="large"
          style={{ display: "block", textAlign: "center", marginTop: "50px" }}
        />
      ) : (
        <Row gutter={[20, 20]}>
          {/* Query Accuracy Section */}
          <Col xs={24} md={16}>
            <Card
              title={
                <Typography.Text strong>
                  Query Accuracy Over Time
                </Typography.Text>
              }
              style={{ height: "400px" }}
            >
              <LineChart
                data={queryAccuracy}
                legendX="Day"
                legendY="Accuracy (%)"
                minX="0"
                minY="1"
              />
            </Card>
          </Col>

          {/* Fallback Rate Section */}
          <Col xs={24} md={8}>
            <Card
              title={<Typography.Text strong>Fallback Rate</Typography.Text>}
              style={{
                height: "155px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  marginTop: "-10px",
                }}
              >
                <Typography.Text
                  strong
                  style={{ fontSize: "32px", color: token.colorPrimary }}
                >
                  {fallback}%
                </Typography.Text>
              </div>
            </Card>

            {/* Top Keywords Section */}
            <Card
              title={<Typography.Text strong>Top Keywords</Typography.Text>}
              style={{ height: "225px", marginBottom: "2px" }}
            >
              {keywords.length === 0 ? (
                <Typography.Text>No keywords available</Typography.Text>
              ) : (
                keywords.map((keyword, index) => (
                  <Typography.Text
                    key={index}
                    style={{ display: "block", marginBottom: "8px" }}
                  >
                    {index + 1}. {keyword}
                  </Typography.Text>
                ))
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Analytics;
