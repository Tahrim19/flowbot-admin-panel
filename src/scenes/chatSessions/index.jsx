import React, { useState, useEffect } from "react";
import {
  Input,
  Typography,
  Select,
  Table,
  message,
  Spin,
  Modal,
  List,
  Card,
} from "antd";
import axios from "axios";
import { useTheme } from "../../theme";
import requests from "../../Requests";
import dayjs from "dayjs";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const { Option } = Select;

const ChatSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByLastActive, setFilterByLastActive] = useState("all");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { theme } = useTheme();
  const { token } = theme;

  // Fetch chat sessions from API
  useEffect(() => {
    const fetchChatSessions = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("token");
        const bId = localStorage.getItem("businessId");
        if (!authToken) {
          message.error("Unauthorized: No token found");
          return;
        }
        if (!bId) {
          message.error("Unauthorized: No businessId found");
          return;
        }

        const response = await axios.get(requests.chatSessions, {
          headers: { "x-access-token": authToken, "x-business-id": bId },
        });

        const rows = response.data?.rows || [];

        setSessions(rows);
        setFilteredSessions(rows);
      } catch (error) {
        message.error("Failed to fetch chat sessions");
        console.error("Error fetching chat sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatSessions();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, filterByLastActive);
  };

  // Handle last active filter change
  const handleLastActiveFilter = (value) => {
    setFilterByLastActive(value);
    applyFilters(searchTerm, value);
  };

  // Apply search & filter logic
  const applyFilters = (search, lastActiveFilter) => {
    const now = dayjs();

    const filtered = sessions.filter((session) => {
      const userId = session.id?.toString().toLowerCase() || "";
      const channel = session.channel?.toString().toLowerCase() || "";
      const lastActive = session.last_active
        ? dayjs(session.last_active)
        : null;

      const matchesSearch =
        !search || userId.includes(search) || channel.includes(search);

      let matchesLastActive = true;
      if (lastActive) {
        const diffHours = now.diff(lastActive, "hour");

        if (lastActiveFilter === "within_24_hours") {
          matchesLastActive = diffHours <= 24;
        } else if (lastActiveFilter === "more_than_24_hours") {
          matchesLastActive = diffHours > 24;
        }
      }

      return matchesSearch && matchesLastActive;
    });

    setFilteredSessions(filtered);
  };

  const fetchMessages = async (conversationId) => {
    setMessageLoading(true);
    try {
      const authToken = localStorage.getItem("token");
      const bId = localStorage.getItem("businessId");

      const response = await axios.get(
        `${requests.messages}?conversation_id=${conversationId}&orderBy=created_at asc`,
        {
          headers: { "x-access-token": authToken, "x-business-id": bId },
        }
      );

      setMessages(response.data?.data?.rows || []);
      setSelectedSessionId(conversationId);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch messages");
    } finally {
      setMessageLoading(false);
    }
  };

  const columns = [
    { title: "User ID", dataIndex: "id", key: "id" },
    { title: "Channel", dataIndex: "channel", key: "channel" },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    { title: "Last Active", dataIndex: "last_active", key: "last_active" },
    { title: "Sender", dataIndex: "sender", key: "sender" },
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
      <Typography.Title level={2} style={{ marginBottom: "1.5rem" }}>
        Chat Sessions
      </Typography.Title>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Input
          placeholder="Search by User ID or Channel"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "60%" }}
        />
        <Select
          value={filterByLastActive}
          onChange={handleLastActiveFilter}
          style={{ width: "35%" }}
        >
          <Option value="all">All</Option>
          <Option value="within_24_hours">Within 24 Hours</Option>
          <Option value="more_than_24_hours">More than 24 Hours</Option>
        </Select>
      </div>

      {/* Chat Sessions Table */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredSessions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          onRow={(record) => ({
            onClick: () => fetchMessages(record.id),
            style: { cursor: "pointer" },
          })}
        />
      )}

      {/* Messages Modal */}
      <Modal
        open={isModalVisible}
        title="Conversation"
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width='90%'
        style={{ maxHeight: "100vh", paddiingBottom:20 }}
      >
        {messageLoading ? (
          <Spin size="large" />
        ) : (
          <List
            dataSource={messages}
            renderItem={(msg) => {
              const isUser = msg.sender?.toLowerCase() === "user";
              let messageText = msg.content;
              try {
                const parsed = JSON.parse(msg.content);
                messageText = parsed?.text || msg.content;
              } catch {
                // keep original
              }

              return (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-end",
                      flexDirection: isUser ? "row-reverse" : "row",
                    }}
                  >
                    {isUser ? (
                      <UserOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
                    ) : (
                      <RobotOutlined style={{ fontSize: 20, color: "#555" }} />
                    )}

                    <Card
                      style={{
                        maxWidth: "100vh",
                        borderRadius: "20px",
                        backgroundColor: isUser ? token.colorPrimary : "#f5f5f5",
                        color: isUser ? "#fff" : token.colorTextBase,
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <p style={{ margin: 0 }}>{messageText}</p>
                      <div style={{ textAlign: "right", marginTop: 0 }}>
                        <small style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                          {dayjs(msg.created_at).format("HH:mm A")}
                        </small>
                      </div>
                    </Card>
                  </div>
                </List.Item>
              );
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ChatSessions;
