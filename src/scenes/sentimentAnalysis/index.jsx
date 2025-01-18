import React from "react";
import { Typography, Card, List, Divider, Row, Col } from "antd";
import AreaChart from "../../components/AreaChart"; // Assuming you have this component
import { useTheme } from "../../theme"; // Import your custom theme

const SentimentAnalysis = () => {
  // Mock data for query examples
  const sentimentExamples = [
    { query: "How do I reset my password?", sentiment: "Positive" },
    { query: "The app keeps crashing!", sentiment: "Negative" },
    { query: "Can you explain the billing details?", sentiment: "Neutral" },
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
      {/* Header */}
      <Typography.Title
        level={2}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Sentiment Analysis
      </Typography.Title>

      <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
        Understand the sentiment trends and distribution across user
        interactions.
      </Typography.Paragraph>

      {/* Main Content */}
      <Row gutter={[20, 20]}>
        {/* Sentiment Trends Over Time */}
        <Col xs={24} sm={24} md={12} lg={14}>
          <Card
            title="Sentiment Trends Over Time"
            bordered={false}
            style={{
              padding: "20px",
              backgroundColor: token.colorBgContainer,
              height: "500px",
            }}
          >
            <div style={{ marginTop: "-20px" }}>
              <AreaChart />
            </div>
          </Card>
        </Col>

        {/* Sentiment Distribution by Query Text */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card
            title="Sentiment Distribution by Query Text"
            bordered={false}
            style={{
              padding: "20px",
              backgroundColor: token.colorBgContainer,
            }}
          >
            <List
              dataSource={sentimentExamples}
              renderItem={(example, index) => (
                <React.Fragment key={index}>
                  <List.Item>
                    <List.Item.Meta
                      title={`Query: "${example.query}"`}
                      description={`Sentiment: ${example.sentiment}`}
                    />
                  </List.Item>
                  {index < sentimentExamples.length - 3 && <Divider />}
                </React.Fragment>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Optional: Sentiment Distribution Overview */}
      {/* 
      <Card
        title="Sentiment Distribution Overview"
        bordered={false}
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: token.colorBgContainer,
        }}
      >
        <PieChart />
      </Card>
      */}
    </div>
  );
};

export default SentimentAnalysis;
