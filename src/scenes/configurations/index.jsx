import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Form,
  Select,
  Row,
  Col,
  notification,
} from "antd";
import { useTheme } from "../../theme";

const { Option } = Select;

const Settings = () => {
  const [channel, setChannel] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [domain, setDomain] = useState("");
  const [whatsappApiKey, setWhatsappApiKey] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappTemplate, setWhatsappTemplate] = useState("");
  const [whatsappSenderName, setWhatsappSenderName] = useState("");

  const { theme } = useTheme();
  const { token } = theme;

  const handleSaveSettings = () => {
    notification.success({
      message: "Settings Saved",
      description: "Your settings have been saved successfully!",
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
      <Typography.Title level={2} style={{ marginBottom: "1.5rem" }}>
        Configurations
      </Typography.Title>

      <Typography.Title level={4}>Channel Selection</Typography.Title>
      <Form.Item label="Select Channel" required>
        <Select
          value={channel}
          onChange={(value) => setChannel(value)}
          placeholder="Choose a channel"
        >
          <Option value="web">Web</Option>
          <Option value="whatsapp">WhatsApp</Option>
        </Select>
      </Form.Item>

      <Typography.Title level={4}>Language Selection</Typography.Title>
      <Form.Item label="Language Preference" required>
        <Select
          value={languagePreference}
          onChange={(value) => setLanguagePreference(value)}
        >
          <Option value="en">English</Option>
          <Option value="ar">Arabic</Option>
        </Select>
      </Form.Item>

      {/* Render Form Only if a Channel is Selected */}
      {channel && (
        <>
          {channel === "web" ? (
            <div>
              <Typography.Title level={4}>Web Configuration</Typography.Title>
              <Form.Item label="Domain">
                <Input
                  placeholder="Enter your website domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </Form.Item>
            </div>
          ) : (
            <div>
              <Typography.Title level={4}>
                WhatsApp Configuration
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="WhatsApp API Key">
                    <Input
                      placeholder="Enter your WhatsApp API key"
                      value={whatsappApiKey}
                      onChange={(e) => setWhatsappApiKey(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="WhatsApp Number">
                    <Input
                      placeholder="Enter your WhatsApp number"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="WhatsApp Template">
                    <Input
                      placeholder="Enter WhatsApp template ID"
                      value={whatsappTemplate}
                      onChange={(e) => setWhatsappTemplate(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Sender Name">
                    <Input
                      placeholder="Enter sender's display name"
                      value={whatsappSenderName}
                      onChange={(e) => setWhatsappSenderName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}

          <Button type="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </>
      )}
    </div>
  );
};

export default Settings;
