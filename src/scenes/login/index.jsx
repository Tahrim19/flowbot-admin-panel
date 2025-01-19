import React, { useState } from "react";
import { Button, Input, Typography, Card, Form, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { username, password } = values;
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setError("Invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    console.log("Redirect to forgot password page");
    navigate('/forgot-password'); // Replace with your Forgot Password page route
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5", // Default Ant Design background color
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "400px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
        }}
      >
        <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
        >
          {/* Username Field */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {/* Remember Me & Forgot Password */}
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Typography.Link onClick={handleForgotPassword}>
                Forgot Password?
              </Typography.Link>
            </div>
          </Form.Item>

          {/* Error Message */}
          {error && (
            <Typography.Text type="danger" style={{ display: "block", marginBottom: "15px" }}>
              {error}
            </Typography.Text>
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
