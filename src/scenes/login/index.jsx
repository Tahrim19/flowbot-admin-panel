/* withouth authentication code*/ 
// import React, { useState } from "react";
// import { Button, Input, Typography, Card, Form, Checkbox } from "antd";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setIsAuthenticated }) => {
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (values) => {
//     const { username, password } = values;
//     if (username === "admin" && password === "admin") {
//       setIsAuthenticated(true);
//       navigate('/');
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   const handleForgotPassword = () => {
//     console.log("Redirect to forgot password page");
//     navigate('/forgot-password'); // Replace with your Forgot Password page route
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f0f2f5", // Default Ant Design background color
//         padding: "20px",
//       }}
//     >
//       <Card
//         style={{
//           width: "400px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//           borderRadius: "8px",
//         }}
//       >
//         <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
//           Login
//         </Typography.Title>
//         <Form
//           layout="vertical"
//           onFinish={handleLogin}
//           style={{ width: "100%" }}
//           initialValues={{ remember: true }}
//         >
//           {/* Username Field */}
//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input placeholder="Enter your username" />
//           </Form.Item>

//           {/* Password Field */}
//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password placeholder="Enter your password" />
//           </Form.Item>

//           {/* Remember Me & Forgot Password */}
//           <Form.Item>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Form.Item
//                 name="remember"
//                 valuePropName="checked"
//                 noStyle
//               >
//                 <Checkbox>Remember Me</Checkbox>
//               </Form.Item>
//               <Typography.Link onClick={handleForgotPassword}>
//                 Forgot Password?
//               </Typography.Link>
//             </div>
//           </Form.Item>

//           {/* Error Message */}
//           {error && (
//             <Typography.Text type="danger" style={{ display: "block", marginBottom: "15px" }}>
//               {error}
//             </Typography.Text>
//           )}

//           {/* Submit Button */}
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{
//                 width: "100%",
//               }}
//             >
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;



/* with authentication code*/ 
import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card, Form, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import requests from "../../Requests";
import axios from "axios";


const LoginPage = ({ setIsAuthenticated }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already authenticated (token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [navigate, setIsAuthenticated]);

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      // Make POST request with proper Content-Type and body format
      const response = await axios.post(
        requests.login,
        {
          username,
          password,
        },
        {
          headers: {
            // "Content-Type": "url-form-encoded", // Correct header for JSON body
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful", response.data); // Make sure this contains the token
        console.log(response.data.data.token);

        // Save the token in localStorage
        localStorage.setItem("token", response.data.data.token);
        console.log("token saved");

        // Check if token is set in localStorage
        const token = localStorage.getItem("token");
        console.log(token); // This should print the token now if set correctly

        setIsAuthenticated(true);
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      if (error.response) {
        // Handle known errors from the backend
        setError(error.response.data?.message || "Login failed");
      } else {
        // Handle other errors (e.g., network issues)
        setError("An error occurred. Please try again.");
      }
    }
  };

  // Function to check if JWT token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return payload.exp * 1000 < Date.now(); // Check expiration
    } catch (e) {
      return true; // If decoding fails, treat as expired
    }
  };

  // Redirect to forgot password page
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
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
        <Typography.Title
          level={3}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Login
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{ remember: true }}
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          {/* Password */}
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
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Typography.Link onClick={handleForgotPassword}>
                Forgot Password?
              </Typography.Link>
            </div>
          </Form.Item>

          {/* Error Message */}
          {error && (
            <Typography.Text
              type="danger"
              style={{ display: "block", marginBottom: "15px" }}
            >
              {error}
            </Typography.Text>
          )}

          {/* Login Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
