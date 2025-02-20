// import React from "react";
// import { Modal } from "antd";
// import { useNavigate } from "react-router-dom";

// const Logout = ({ setIsAuthenticated }) => {
//   const navigate = useNavigate();

//   // Show confirmation modal when component loads
//   React.useEffect(() => {
//     Modal.confirm({
//       title: "Confirm Logout",
//       content: "Are you sure you want to log out?",
//       okText: "Yes, Logout",
//       cancelText: "Cancel",
//       onOk: () => {
//         localStorage.clear();
//         setIsAuthenticated(false);
//         navigate("/login"); // Redirect to login after logout
//       },
//       onCancel: () => navigate(-1), // Go back if canceled
//     });
//   }, [navigate, setIsAuthenticated]);

//   return null; // No UI needed since modal handles everything
// };

// export default Logout;



import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login after logout
  };

  const handleCancel = () => {
    navigate(-1); // Go back if canceled
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Confirm Logout"
      open={isModalVisible}
      onOk={handleLogout}
      onCancel={handleCancel}
      okText="Yes, Logout"
      cancelText="Cancel"
    >
      <p>Are you sure you want to log out?</p>
    </Modal>
  );
};

export default Logout;
