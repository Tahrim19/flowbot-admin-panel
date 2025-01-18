import React, { useState } from "react";
import { Typography, Select, Card, Row, Col } from "antd";
import LineChart from "../../components/LineChart"; // BarChart component
import { useTheme } from "../../theme";

const { Option } = Select;

const Analytics = () => {
  const { theme } = useTheme();
  const { token } = theme;
  const [timeframe, setTimeframe] = useState("weekly");

  const handleTimeframeChange = (value) => {
    setTimeframe(value);
  };

  // Mock data
  const fallbackRate = 12; // Example fallback rate
  const topKeywords = ["keyword1", "keyword2", "keyword3"];
  //   const unansweredKeywords = ["query1", "query2", "query3"];

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
      <div
        style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
      >
        <Typography.Text strong style={{ marginRight: "16px" }}>
          Filter by Timeframe:
        </Typography.Text>
        <Select
          value={timeframe}
          onChange={handleTimeframeChange}
          style={{ minWidth: "200px" }}
        >
          <Option value="daily">Daily</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="monthly">Monthly</Option>
        </Select>
      </div>

      {/* Layout */}
      <Row gutter={[20, 20]}>
        {/* Query Accuracy Section */}
        <Col xs={24} md={12}>
          <Card
            title={
              <Typography.Text strong>Query Accuracy Over Time</Typography.Text>
            }
            style={{ height: "400px" }}
          >
            <LineChart />
          </Card>
        </Col>

        {/* Fallback Rate Section */}
        <Col xs={24} md={12}>
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
                {fallbackRate}%
              </Typography.Text>
            </div>
          </Card>

          {/* Top Keywords Section */}

          <Card
            title={<Typography.Text strong>Top Keywords</Typography.Text>}
            style={{ height: "225px", marginBottom: "2px" }}
          >
            {topKeywords.length === 0 ? (
              <Typography.Text>No keywords available</Typography.Text>
            ) : (
              topKeywords.map((keyword, index) => (
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

        {/* Top Keywords Section */}
        {/* <Col xs={24} md={12}>
          <Card
            title={<Typography.Text strong>Top Keywords</Typography.Text>}
            style={{ height: "400px" }}
          >
            {topKeywords.length === 0 ? (
              <Typography.Text>No keywords available</Typography.Text>
            ) : (
              topKeywords.map((keyword, index) => (
                <Typography.Text
                  key={index}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  {index + 1}. {keyword}
                </Typography.Text>
              ))
            )}
          </Card>
        </Col> */}

        {/* Unanswered Keywords Section */}
        {/* <Col xs={24} md={12}>
          <Card
            title={
              <Typography.Text strong>Unanswered Keywords</Typography.Text>
            }
            style={{ height: "400px" }}
          >
            {unansweredKeywords.length === 0 ? (
              <Typography.Text>
                No unanswered keywords available
              </Typography.Text>
            ) : (
              unansweredKeywords.map((keyword, index) => (
                <Typography.Text
                  key={index}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  {index + 1}. {keyword}
                </Typography.Text>
              ))
            )}
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default Analytics;
