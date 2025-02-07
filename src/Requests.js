const baseUrl = 'http://192.168.1.14:3000/api/v1';
const requests = {
    login: `${baseUrl}/login`,
}
export default requests;



  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove token
  //   setIsAuthenticated(false);
  //   navigate("/login");
  //   message.success("Logged out successfully");
  // };