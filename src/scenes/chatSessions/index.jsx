import React, { useState } from "react";
import { Input, Typography, Select, Table } from "antd";
import { mockChatSessions as sessions } from "./../../dummyData/data";
import { useTheme } from "../../theme";

const { Option } = Select;

const ChatSessions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("all");
  const { theme } = useTheme();
  const { token } = theme;

  // Columns for Table
  const columns = [
    { title: "Session ID", dataIndex: "sessionId", key: "sessionId" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    {
      title: "Total Messages",
      dataIndex: "totalMessages",
      key: "totalMessages",
    },
    {
      title: "Avg Response Time (ms)",
      dataIndex: "avgResponseTime",
      key: "avgResponseTime",
    },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  // Filtering Logic
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (value) => {
    setFilterByStatus(value);
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      searchTerm === "" ||
      session.userId.toString().includes(searchTerm) ||
      session.sessionId.toString().includes(searchTerm);
    const matchesStatus =
      filterByStatus === "all" || session.status === filterByStatus;
    return matchesSearch && matchesStatus;
  });

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
          placeholder="Search by User ID or Session ID"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "60%" }}
        />
        <Select
          value={filterByStatus}
          onChange={handleStatusFilter}
          style={{ width: "35%" }}
        >
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </div>

      {/* Chat Sessions Table */}
      <Table
        columns={columns}
        dataSource={filteredSessions}
        rowKey="sessionId"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ChatSessions;
