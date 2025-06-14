import React, { useState, useEffect } from "react";
import { Button, Table, Typography, message } from "antd";
import { saveAs } from "file-saver";
import axios from "axios";
import { useTheme } from "../../theme";
import requests from "../../Requests";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { token } = theme;

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("token"); // Get JWT from storage
        const bId = localStorage.getItem("businessId"); // Get businessId from storage
        if (!authToken) {
          message.error("Unauthorized: No token found");
          return;
        }

        if (!bId) {
          message.error("Unauthorized: No businessId found");
          return;
        }

        const response = await axios.get(requests.users, {
          headers: { "x-access-token": authToken, "x-business-id": bId }, // Send token and businessId in headers
        });
        // console.log(response.data);
        if (response.data.data.rows.length === 0) {
          setUsers([]);
        } else {
          setUsers(response.data.data.rows);
        }
        // console.log("Setusers: ", response.data.data.rows);
      } catch (error) {
        message.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // // console.log(users);
  // console.log("users: ", users);

  // Table Columns
  const columns = [
    { title: "User ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  // Export Data as CSV
  // const handleExportCSV = () => {
  //   const headers = ["User ID", "Name", "Email"];
  //   const rows = users.map((user) => [user.id, user.name, user.email]);

  //   const csvContent = [
  //     headers.join(","), // Join headers with commas
  //     ...rows.map((row) => row.join(",")), // Join rows with commas
  //   ].join("\n"); // Join rows with newline characters

  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   saveAs(blob, "users_data.csv");
  // };

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

      {/* Export as CSV button */}
      {/* <Button
        type="primary"
        onClick={handleExportCSV}
        style={{
          marginBottom: "20px",
        }}
      >
        Export Data as CSV
      </Button> */}

      {/* Users Table */}
      <div style={{ marginBottom: "40px", width: "100%" }}>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>
    </div>
  );
};

export default Users;
