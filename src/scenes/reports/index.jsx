import React, { useState } from "react";
import { Button, Select, Form, Typography, Row, Col } from "antd";
import { useTheme } from "../../theme"; // Assuming you're using your custom theme

const { Option } = Select;

const Reports = () => {
  const [reportType, setReportType] = useState("");
  const { theme } = useTheme();
  const { token } = theme;

  const handleDownload = (format) => {
    if (!reportType) {
      alert("Please select a report type.");
      return;
    }
    // download logic here
    alert(`Downloading ${reportType} report as ${format.toUpperCase()}`);
  };

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
        Reports
      </Typography.Title>
      <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
        Generate and download detailed reports.
      </Typography.Paragraph>

      {/* Report Generation Section */}
      <div style={{ marginBottom: "30px" }}>
        <Typography.Title
          level={5}
          style={{
            marginBottom: "1.5rem",
            color: token.colorTextBase,
          }}
        >
          Generate Reports
        </Typography.Title>
        <Form layout="vertical" style={{ marginBottom: "16px" }}>
          <Form.Item label="Report Type" required>
            <Select
              value={reportType}
              onChange={(value) => setReportType(value)}
              placeholder="Select a report type"
            >
              <Option value="Chat Sessions">Chat Sessions</Option>
              <Option value="User Statistics">User Statistics</Option>
              <Option value="Document Performance">Document Performance</Option>
              <Option value="Query Trends">Query Trends</Option>
            </Select>
          </Form.Item>
        </Form>

        <Row gutter={16}>
          <Col>
            <Button
              type="primary"
              style={{
                backgroundColor: token.colorPrimary,
                borderColor: token.colorPrimary,
              }}
              onClick={() => handleDownload("csv")}
              disabled={!reportType}
            >
              Download CSV
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              //   style={{ backgroundColor: token.colorSuccess, borderColor: token.colorSuccess }}
              style={{
                backgroundColor: token.colorPrimary,
                borderColor: token.colorPrimary,
              }}
              onClick={() => handleDownload("pdf")}
              disabled={!reportType}
            >
              Download PDF
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Reports;
