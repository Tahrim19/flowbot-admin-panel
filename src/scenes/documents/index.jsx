import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Typography,
  Space,
  Upload,
  Input,
  Select,
  message,
  Spin,
} from "antd";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useTheme } from "../../theme";
import requests from "../../Requests";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);

  const { theme } = useTheme();
  const { token } = theme;

  const authToken = localStorage.getItem("token");
  const bId = localStorage.getItem("businessId");

  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        if (!authToken || !bId) {
          message.error("Unauthorized: Missing token or businessId");
          return;
        }

        const response = await axios.get(requests.documents, {
          headers: { "x-access-token": authToken, "x-business-id": bId },
        });

        setDocuments(response.data.data.rows || []);
      } catch (error) {
        message.error("Failed to fetch documents");
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [authToken, bId]);

  // Open Upload Dialog
  const handleUpload = () => setOpenDialog(true);

  // Close Upload Dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
    setFile(null);
    setName("");
    setLanguage("");
  };

  // Handle File Selection
  const handleFileChange = ({ file }) => {
    setFile(file);
    setName(file.name);
  };

  // Handle Document Upload
  const handleSubmit = async () => {
    if (!file || !name || !language) {
      message.error("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file.originFileObj || file);
      formData.append("language", language);

      // Upload File
      console.log("Uploading file...");
      const uploadResponse = await axios.post(
        requests.uploadDocument,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": authToken,
            "x-business-id": bId,
          },
        }
      );

      if (!uploadResponse.data?.url || !uploadResponse.data?.uid) {
        throw new Error("File upload failed. URL or UID is missing.");
      }

      // Save Document Data
      const documentData = {
        document_name: name,
        document_path: uploadResponse.data.url,
        document_lang: language,
        document_type: file.type,
      };

      const saveResponse = await axios.post(requests.documents, documentData, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
          "Content-Type": "application/json",
        },
      });

      if (!saveResponse.data.status || saveResponse.data.status.toLowerCase() === 'error') {
        throw new Error("Failed to save document details.");
      }

      // Update the Table
      setDocuments((prevDocs) => [...prevDocs, documentData]);

      message.success("Document uploaded successfully!");
      handleDialogClose();
    } catch (error) {
      message.error(`Failed to upload document: ${error.message}`);
      console.error("Error uploading document:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open Delete Confirmation Modal
  const showDeleteModal = (id) => {
    setSelectedDocId(id);
    setDeleteModalVisible(true);
  };

  // Handle Document Deletion
  const handleDelete = async () => {
    if (!selectedDocId) return;

    try {
      await axios.delete(`${requests.documents}/${selectedDocId}`, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
        },
      });

      setDocuments((prevDocs) =>
        prevDocs.filter((doc) => doc.id !== selectedDocId)
      );
      message.success("Document deleted successfully.");
      setDeleteModalVisible(false);
    } catch (error) {
      message.error("Failed to delete document.");
      console.error("Error deleting document:", error);
    }
  };

  // Table Columns
  const queriedColumns = [
    { title: "Document ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "document_name", key: "name" },
    {
      title: "URL",
      dataIndex: "document_path",
      key: "url",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    { title: "Language", dataIndex: "document_lang", key: "language" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button danger onClick={() => showDeleteModal(record.id)}>
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

      {/* Upload Button */}
      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginBottom: "20px" }}
      >
        Add Document
      </Button>

      {/* Documents Table with Loading Spinner */}
      <Typography.Title level={5}>Queried Documents</Typography.Title>
      {documents.length > 0 ? (
        <Table
          columns={queriedColumns}
          dataSource={documents}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      ) : (
        // <Typography.Text type="secondary">
        //   No queried documents available.
        // </Typography.Text>
        <Spin size="large"/>
      )}

      {/* Upload Modal */}
      <Modal
        title="Upload Document"
        open={openDialog}
        onCancel={handleDialogClose}
        footer={[
          <Button key="cancel" onClick={handleDialogClose}>
            Cancel
          </Button>,
          <Button
            key="upload"
            type="primary"
            onClick={handleSubmit}
            loading={loading}
          >
            Submit
          </Button>,
        ]}
      >
        {/* Name Input */}
        <Typography.Text>Document Name:</Typography.Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter document name"
          style={{ marginBottom: "10px" }}
        />

        {/* Language Selection */}
        <Typography.Text>Select Language:</Typography.Text>
        <Select
          value={language}
          onChange={(value) => setLanguage(value)}
          placeholder="Choose a language"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="ar">Arabic</Select.Option>
        </Select>

        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        {file && <Typography.Text>Selected File: {file.name}</Typography.Text>}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <p>
          <ExclamationCircleOutlined /> Are you sure you want to delete this
          document?
        </p>
      </Modal>
    </div>
  );
};

export default Documents;
