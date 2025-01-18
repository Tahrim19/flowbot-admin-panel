import React, { useState } from "react";
import { Button, Table, Typography } from "antd";
import { saveAs } from "file-saver";
import { mockUsers } from "./../../dummyData/data";
import { useTheme } from "../../theme";

const Users = () => {
  const [users] = useState(mockUsers);
  const { theme } = useTheme();
  const { token } = theme;

  // Export Data as CSV
  const handleExportCSV = () => {
    const headers = [
      "User ID",
      "Phone Number",
      "Total Sessions",
      "Last Active Date",
      "Total Messages",
      "Retention Rate",
    ];
    const rows = users.map((user) => [
      user.id,
      user.phoneNumber,
      user.totalSessions,
      user.lastActive,
      user.totalMessages,
      user.retentionRate,
    ]);

    const csvContent = [
      headers.join(","), // Join headers with commas
      ...rows.map((row) => row.join(",")), // Join rows with commas
    ].join("\n"); // Join rows with newline characters

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users_data.csv");
  };

  // Columns for Table
  const columns = [
    { title: "User ID", dataIndex: "id", key: "id" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Total Sessions",
      dataIndex: "totalSessions",
      key: "totalSessions",
    },
    { title: "Last Active Date", dataIndex: "lastActive", key: "lastActive" },
    {
      title: "Total Messages",
      dataIndex: "totalMessages",
      key: "totalMessages",
    },
    {
      title: "Retention Rate",
      dataIndex: "retentionRate",
      key: "retentionRate",
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
      <Typography.Title
        level={2}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Users
      </Typography.Title>
      <Button
        type="primary"
        onClick={handleExportCSV}
        style={{
          marginBottom: "20px",
        }}
      >
        Export Data as CSV
      </Button>

      {/* Users Table */}
      <div style={{ marginBottom: "40px", width: "100%" }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>
    </div>
  );
};

export default Users;
