import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Form,
  Select,
  Switch,
  Row,
  Col,
  notification,
} from "antd";
import { useTheme } from "../../theme"; // Assuming you're using a custom theme

const { TextArea } = Input;
const { Option } = Select;

const Settings = () => {
  const [whatsappKey, setWhatsappKey] = useState("");
  const [webPlatformKey, setWebPlatformKey] = useState("");
  const [analyticsApiKey, setAnalyticsApiKey] = useState("");
  const [chatbotName, setChatbotName] = useState("Flowbot");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hello! How can I assist you?"
  );
  const [languagePreference, setLanguagePreference] = useState("en");
  const [queryOptimization, setQueryOptimization] = useState(true);

  const { theme } = useTheme();
  const { token } = theme;

  const handleSaveSettings = () => {
    notification.success({
      message: "Settings Saved",
      description: "Your settings have been saved successfully!",
    });
    // Add logic to save these settings to a backend or local storage
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
        Integrations
      </Typography.Title>
      <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
        Configure your application settings for integrations, customization, and
        processing.
      </Typography.Paragraph>

      {/* Integration Settings Section */}
      <div>
        <Typography.Title level={4}>Integration Settings</Typography.Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="WhatsApp API Key">
              <Input
                placeholder="Enter your WhatsApp API key"
                value={whatsappKey}
                onChange={(e) => setWhatsappKey(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Web Platform Key">
              <Input
                placeholder="Enter your web platform integration key"
                value={webPlatformKey}
                onChange={(e) => setWebPlatformKey(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* API Keys Section */}
      <div>
        <Typography.Title level={4}>API Keys</Typography.Title>
        <Form.Item label="Analytics Tool API Key">
          <Input
            placeholder="Enter the API key for analytics integration"
            value={analyticsApiKey}
            onChange={(e) => setAnalyticsApiKey(e.target.value)}
          />
        </Form.Item>
      </div>

      {/* Customization Options Section */}
      <div>
        <Typography.Title level={4}>Customization Options</Typography.Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Chatbot Name">
              <Input
                placeholder="Set your chatbot's name"
                value={chatbotName}
                onChange={(e) => setChatbotName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Welcome Message">
              <TextArea
                style={{ resize: "none" }} 
                rows={1}
                placeholder="Set the default welcome message for users"
                value={welcomeMessage}
                // autoSize={false}
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Document Processing Settings Section */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Typography.Title level={4}>
          Document Processing Settings
        </Typography.Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Language Preference">
              <Select
                value={languagePreference}
                onChange={(value) => setLanguagePreference(value)}
                placeholder="Select a language"
              >
                <Option value="en">English</Option>
                <Option value="ar">Arabic</Option>
                <Option value="fr">French</Option>
                <Option value="de">German</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography.Text>Enable Query Optimization</Typography.Text>
                <Switch
                  checked={queryOptimization}
                  onChange={(checked) => setQueryOptimization(checked)}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* Save Button */}
      <div>
        <Button
          type="primary"
          onClick={handleSaveSettings}
          style={{
            backgroundColor: token.colorPrimary,
            borderColor: token.colorPrimary,
          }}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
