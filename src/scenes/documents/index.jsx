import React, { useState } from "react";
import { Button, Table, Modal, Typography, Space } from "antd";
import { mockDocuments } from "../../dummyData/data";
import { useTheme } from "../../theme"; // Assuming you're using your custom theme

const Documents = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [openDialog, setOpenDialog] = useState(false);
  const { theme } = useTheme();
  const { token } = theme;

  // Functions to handle actions
  const handleUpload = () => {
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Columns for Table
  const queriedColumns = [
    { title: "Document ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Language", dataIndex: "language", key: "language" },
    {
      title: "Last Queried Date",
      dataIndex: "lastQueried",
      key: "lastQueried",
    },
    {
      title: "Total Queries Matched",
      dataIndex: "totalQueries",
      key: "totalQueries",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
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
      <Typography.Title
        level={2}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Documents
      </Typography.Title>
      <Button
        type="primary"
        onClick={handleUpload}
        style={{
          marginBottom: "20px",
        }}
      >
        Upload Document
      </Button>

      {/* Queried Documents Section */}
      <Typography.Title level={5}>Queried Documents</Typography.Title>
      {documents.length > 0 ? (
        <div style={{ marginBottom: "40px", width: "100%" }}>
          <Table
            columns={queriedColumns}
            dataSource={documents}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      ) : (
        <Typography.Text type="secondary">
          No queried documents available.
        </Typography.Text>
      )}

      {/* Upload Dialog */}
      <Modal
        title="Upload Document"
        open={openDialog}
        onCancel={handleDialogClose}
        footer={[
          <Button key="back" onClick={handleDialogClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Upload
          </Button>,
        ]}
      >
        <Typography.Text>Document upload form goes here.</Typography.Text>
      </Modal>
    </div>
  );
};

export default Documents;
