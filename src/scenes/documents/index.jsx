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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
  const { theme } = useTheme();
  const { token } = theme;

  const authToken = localStorage.getItem("token");
  const bId = localStorage.getItem("businessId");

  // Fetch documents from API
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        if (!authToken) {
          message.error("Unauthorized: No token found");
          return;
        }
        if (!bId) {
          message.error("Unauthorized: No businessId found");
          return;
        }

        const response = await axios.get(requests.documents, {
          headers: { "x-access-token": authToken, "x-business-id": bId },
        });

        setDocuments(
          response.data.data.rows.length > 0 ? response.data.data.rows : []
        );
      } catch (error) {
        message.error("Failed to fetch documents");
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [authToken,bId]);

  // Handle Upload Dialog
  const handleUpload = () => {
    setOpenDialog(true);
  };

  // handle the close of the dialog
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

  // handle submit of document
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

      console.log("Upload Response:", uploadResponse.data);

      if (
        !uploadResponse.data ||
        !uploadResponse.data.url ||
        !uploadResponse.data.uid
      ) {
        throw new Error("File upload failed. URL or UID is missing.");
      }

      // Use the Input Field Values for Name & Language
      const documentData = {
        // id: uploadResponse.data.id, // Use ID from the response
        document_name: name, 
        document_path: uploadResponse.data.url,
        document_lang: language,
        document_type: file.type,
      };

      console.log("Saving document data:", documentData);

      // Save Document Data
      const saveResponse = await axios.post(requests.documents, documentData, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
          "Content-Type": "application/json",
        },
      });

      console.log("Save Response:", saveResponse.data);

      if (!saveResponse.data.success) {
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

  // Handle Delete Document
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${requests.documents}/${id}`, {
        headers: {
          "x-access-token": authToken,
          "x-business-id": bId,
        },
      });

      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      message.success("Document deleted successfully.");
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

      {/* Upload Button */}
      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginBottom: "20px" }}
      >
        Add Document
      </Button>

      {/* Queried Documents Table */}
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
        <Typography.Text type="secondary">
          No queried documents available.
        </Typography.Text>
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
          <Select.Option value="ar">Arabic</Select.Option>\
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
    </div>
  );
};

export default Documents;
