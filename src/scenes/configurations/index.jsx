import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Form,
  Select,
  notification,
  Table,
  Modal,
} from "antd";
import axios from "axios";
import { useTheme } from "../../theme";
import requests from "../../Requests";

const { Option } = Select;

const Settings = () => {
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState("");

  const [form] = Form.useForm();

  const { theme } = useTheme();
  const { token } = theme;

  const authToken = localStorage.getItem("token");
  const bId = localStorage.getItem("businessId");

  const fetchConfigurations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(requests.configurations, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
        },
      });

      const rawData = response.data.data.rows;
      const formattedData = rawData.map((config) => ({
        ...config,
        ...config.details,
      }));
      setConfigurations(formattedData);
    } catch (error) {
      console.error("Error fetching configurations:", error);
      notification.error({
        message: "Fetch Failed",
        description: "Unable to fetch configurations.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (values) => {
    const configData = {
      channel: values.channel,
      lang: values.languagePreference,
      init_msg: values.init_msg,
      name: values.bot_name,
      ...(values.channel === "web"
        ? { domain: values.domain }
        : {
            number: values.whatsappNumber,
            senderPhoneNumberId: values.senderPhoneNumberId,
            wabaId: values.wabaId,
            accessToken: authToken,
          }),
    };

    try {
      const response = selectedConfig
        ? await axios.put(
            `${requests.configurations}/${selectedConfig.id}`,
            configData,
            {
              headers: {
                "x-access-token": authToken,
                "x-business-id": bId,
                "Content-Type": "application/json",
              },
            }
          )
        : await axios.post(requests.configurations, configData, {
            headers: {
              "x-access-token": authToken,
              "x-business-id": bId,
              "Content-Type": "application/json",
            },
          });

      notification.success({
        message: selectedConfig
          ? "Configuration Updated"
          : "Configuration Added",
        description: "Your configuration has been saved successfully!",
      });

      fetchConfigurations();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving configuration:", error);
      notification.error({
        message: "Save Failed",
        description: "There was an error saving your configuration.",
      });
    }
  };

  const openModal = (config = null) => {
    setSelectedConfig(config);
    const defaultValues = {
      channel: "",
      languagePreference: "en",
      domain: "",
      init_msg: "",
      bot_name: "",
      whatsappNumber: "",
      senderPhoneNumberId: "",
      wabaId: "",
    };

    if (config) {
      const webFields = {
        channel: config.channel || "",
        languagePreference: config.lang || "en",
        domain: config.domain || "",
        init_msg: config.init_msg || "",
        bot_name: config.name || "",
      };

      const wappFields = {
        whatsappNumber: config.number || "",
        senderPhoneNumberId: config.senderPhoneNumberId || "",
        wabaId: config.wabaId || "",
      };

      const fullFields =
        config.channel === "web"
          ? { ...defaultValues, ...webFields }
          : { ...defaultValues, ...webFields, ...wappFields };

      form.setFieldsValue(fullFields);
      setChannel(config.channel || "");
    } else {
      form.setFieldsValue(defaultValues);
      setChannel("");
    }

    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedConfig(null);
    form.resetFields();
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const handleDeleteConfiguration = async (id) => {
    try {
      await axios.delete(`${requests.configurations}/${id}`, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
        },
      });

      notification.success({
        message: "Configuration Deleted",
        description: "The configuration has been deleted successfully!",
      });

      fetchConfigurations(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting configuration:", error);
      notification.error({
        message: "Delete Failed",
        description: "There was an error deleting the configuration.",
      });
    }
  };

  // const columns = [
  //   {
  //     title: "Bot Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Channel",
  //     dataIndex: "channel",
  //     key: "channel",
  //   },
  //   {
  //     title: "Language",
  //     dataIndex: "lang",
  //     key: "lang",
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (_, record) => (
  //       <Button type="link" onClick={() => openModal(record)}>
  //         Edit
  //       </Button>
  //     ),
  //   },
  // ];
  const columns = [
    {
      title: "Bot Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Language",
      dataIndex: "lang",
      key: "lang",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => openModal(record)}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDeleteConfiguration(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: token.colorBgBase,
        color: token.colorTextBase,
        marginLeft: "210px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <Typography.Title level={2} style={{ marginBottom: "0" }}>
          Integrations
        </Typography.Title>
        <Button type="primary" onClick={() => openModal()}>
          Add
        </Button>
      </div>

      <Table
        dataSource={configurations}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={selectedConfig ? "Edit Configuration" : "Add New Configuration"}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveSettings}>
          <Form.Item
            label="Bot Name"
            name="bot_name"
            rules={[{ required: true, message: "Please enter the bot name!" }]}
          >
            <Input placeholder="Enter Bot Name" />
          </Form.Item>

          <Form.Item label="Initial Message" name="init_msg">
            <Input placeholder="Enter initial message" />
          </Form.Item>

          <Form.Item
            label="Channel"
            name="channel"
            rules={[{ required: true, message: "Please select a channel!" }]}
          >
            <Select
              onChange={(value) => setChannel(value)}
              placeholder="Choose a channel"
              disabled={!!selectedConfig}
            >
              <Option value="web">Web</Option>
              <Option value="wapp">WhatsApp</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Language Preference"
            name="languagePreference"
            rules={[{ required: true, message: "Please select a language!" }]}
          >
            <Select>
              <Option value="en">English</Option>
              <Option value="ar">Arabic</Option>
            </Select>
          </Form.Item>

          {channel === "web" && (
            <Form.Item
              label="Domain"
              name="domain"
              rules={[{ required: true, message: "Please enter the domain!" }]}
            >
              <Input placeholder="Enter Domain" />
            </Form.Item>
          )}

          {channel === "wapp" && (
            <>
              <Form.Item
                label="WhatsApp Number"
                name="whatsappNumber"
                rules={[
                  { required: true, message: "Please enter WhatsApp number!" },
                ]}
              >
                <Input placeholder="Enter WhatsApp Number" />
              </Form.Item>

              <Form.Item
                label="Sender Phone Number ID"
                name="senderPhoneNumberId"
                rules={[
                  {
                    required: true,
                    message: "Please enter sender phone number ID!",
                  },
                ]}
              >
                <Input placeholder="Enter Sender Phone Number ID" />
              </Form.Item>

              <Form.Item
                label="WABA ID"
                name="wabaId"
                rules={[
                  {
                    required: true,
                    message: "Please enter WhatsApp Business Account ID!",
                  },
                ]}
              >
                <Input placeholder="Enter WABA ID" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedConfig ? "Update Configuration" : "Add Configuration"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
