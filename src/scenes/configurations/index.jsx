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
import axios from "axios";
import { useTheme } from "../../theme";
import requests from "../../Requests";

const { Option } = Select;

const Settings = () => {
  const [channel, setChannel] = useState("");
  const [languagePreference, setLanguagePreference] = useState("en");
  const [domain, setDomain] = useState("localhost:3000");
  const [whatsappNumber, setWhatsappNumber] = useState("03419876532");
  const [senderPhoneNumberId, setSenderPhoneNumberId] = useState("03451245738");
  const [wabaId, setWabaId] = useState("");

  const { theme } = useTheme();
  const { token } = theme;

  const authToken = localStorage.getItem("token");
  const bId = localStorage.getItem("businessId");

  // const handleSaveSettings = async () => {
  //   const configData = {
  //     channel,
  //     languagePreference,
  //     ...(channel === "web"
  //       ? { domain }
  //       : {
  //           number: whatsappNumber,
  //           senderPhoneNumberId,
  //           wabaId,
  //           accessToken: authToken,
  //         }),
  //   };

  //   try {
  //     await axios.post(requests.configurations, configData, {
  //       headers: {
  //         "x-access-token": authToken,
  //         "x-business-id": bId,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     notification.success({
  //       message: "Settings Saved",
  //       description: "Your settings have been saved successfully!",
  //     });
  //   } catch (error) {
  //     console.error("Error saving settings:", error);
  //     notification.error({
  //       message: "Save Failed",
  //       description: "There was an error saving your settings.",
  //     });
  //   }
  // };

  const handleSaveSettings = async () => {
    const configData = {
      channel,
      lang : languagePreference,
      ...(channel === "web"
        ? { domain }
        : {
            number: whatsappNumber,
            senderPhoneNumberId: senderPhoneNumberId,
            wabaId: wabaId ,
            accessToken: authToken ,
          }),
    };
  
    console.log("Sending Config Data:", configData);  // Debugging
  
    try {
      const response = await axios.post(requests.configurations, configData, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response:", response.data);
  
      notification.success({
        message: "Settings Saved",
        description: "Your settings have been saved successfully!",
      });
    } catch (error) {
      console.error("Error saving settings:", error.response?.data || error.message);
      notification.error({
        message: "Save Failed",
        description: error.response?.data?.message || "There was an error saving your settings.",
      });
    }
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

      <Typography.Title level={4}>Channel Selection</Typography.Title>
      <Form.Item label="Select Channel" required>
        <Select
          value={channel}
          onChange={(value) => setChannel(value)}
          placeholder="Choose a channel"
        >
          <Option value="web">Web</Option>
          <Option value="wapp">WhatsApp</Option>
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
                  <Form.Item label="WhatsApp Number">
                    <Input
                      placeholder="Enter your WhatsApp number"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Sender Phone Number ID">
                    <Input
                      placeholder="Enter sender phone number ID"
                      value={senderPhoneNumberId}
                      onChange={(e) => setSenderPhoneNumberId(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="WABA ID">
                    <Input
                      placeholder="Enter WhatsApp Business Account ID"
                      value={wabaId}
                      onChange={(e) => setWabaId(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Access Token">
                    <Input
                      value={authToken}
                      disabled
                      placeholder="Access token is retrieved automatically"
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
