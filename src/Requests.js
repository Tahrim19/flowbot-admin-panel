const baseUrl = 'http://192.168.1.14:3000/api/v1';
const requests = {
    login: `${baseUrl}/login`,
    users: `${baseUrl}/users`,
    documents: `${baseUrl}/documents`,
    uploadDocument : `${baseUrl}/uploads`,
    chatSessions: `${baseUrl}/conversations`,
}
export default requests;

//  "42df52ea-abe8-4a99-8f9c-10804c0e45bd"

  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove token
  //   setIsAuthenticated(false);
  //   navigate("/login");
  //   message.success("Logged out successfully");
  // };