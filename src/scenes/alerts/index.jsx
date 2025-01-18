import React, { useState } from "react";
import {
  Button,
  Form,
  Select,
  Switch,
  Typography,
  Row,
  Col,
  notification,
} from "antd";
import { useTheme } from "../../theme"; 

const { Option } = Select;

const Alerts = () => {
  const { theme } = useTheme();
  const { token } = theme;

  const [selectedNotification, setSelectedNotification] = useState("");
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);

  const handleNotificationChange = (value) => {
    setSelectedNotification(value);
  };

  const handleEmailChange = (checked) => {
    setEmailNotification(checked);
  };

  const handleSmsChange = (checked) => {
    setSmsNotification(checked);
  };

  const handleSavePreferences = () => {
    // Logic to save the notification preferences (e.g., via API or local state)
    notification.success({
      message: "Preferences Saved",
      description: `Notification preferences saved: 
                    Email: ${emailNotification ? "Enabled" : "Disabled"},
                    SMS: ${smsNotification ? "Enabled" : "Disabled"}`,
    });
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
        ALERTS & NOTIFICATIONS
      </Typography.Title>

      <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
        Set up alerts for various events and manage your notification
        preferences (email, SMS, etc.).
      </Typography.Paragraph>

      {/* Notification Type Selection */}
      <div style={{ marginBottom: "30px" }}>
        <Typography.Title level={4}>Notification Alerts</Typography.Title>
        <Form.Item label="Select Notification Type">
          <Select
            value={selectedNotification}
            onChange={handleNotificationChange}
            placeholder="Select a notification type"
            style={{ width: "100%" }}
          >
            <Option value="accuracyDrops">Accuracy Drops</Option>
            <Option value="peakUsageTimes">Peak Usage Times</Option>
            <Option value="documentUpdate">Document Update Alerts</Option>
          </Select>
        </Form.Item>

        {selectedNotification && (
          <Typography.Paragraph>
            Notifications for "{selectedNotification}" are active.
          </Typography.Paragraph>
        )}
      </div>

      {/* Notification Preferences Section */}
      <Typography.Title level={4}>
        Manage Notification Preferences
      </Typography.Title>
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography.Text>Email Notifications</Typography.Text>
            <Switch
              checked={emailNotification}
              onChange={handleEmailChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography.Text>SMS Notifications</Typography.Text>
            <Switch
              checked={smsNotification}
              onChange={handleSmsChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
        </Col>
      </Row>

      {/* Save Preferences Button */}
      <div style={{ marginTop: "25px" }}>
        <Button
          type="primary"
          onClick={handleSavePreferences}
          style={{
            backgroundColor: token.colorPrimary,
            borderColor: token.colorPrimary,
          }}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default Alerts;
