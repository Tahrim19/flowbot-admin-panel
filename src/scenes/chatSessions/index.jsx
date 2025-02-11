import React, { useState, useEffect } from "react";
import { Input, Typography, Select, Table, message, Spin } from "antd";
import axios from "axios";
import { useTheme } from "../../theme";
import requests from "../../Requests";
import dayjs from "dayjs"; 

const { Option } = Select;

const ChatSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByLastActive, setFilterByLastActive] = useState("all");
  const [loading, setLoading] = useState(false);
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
        setFilteredSessions(rows); // Initialize filtered sessions
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
    const now = dayjs(); // Get current time

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

  // Table Columns
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
      <Typography.Title
        level={2}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Chat Sessions
      </Typography.Title>

      {/* Search and Filter Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
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
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default ChatSessions;
