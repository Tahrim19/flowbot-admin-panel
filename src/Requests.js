const baseUrl = 'http://192.168.1.14:3000/api/v1';
const requests = {
    login: `${baseUrl}/login`,
    users: `${baseUrl}/users`,
    documents: `${baseUrl}/documents`,
    uploadDocument : `${baseUrl}/uploads`,
    chatSessions: `${baseUrl}/conversations`,

    // ANALYTICS
    chatUsage:`${baseUrl}/charts/chat-by-platform`,
    peakUsage:`${baseUrl}/charts/peak-usage-alert`,
    sentimentTrends:`${baseUrl}/charts/sentiment-trends`,
    sentimentDistribution:`${baseUrl}/charts/sentiment-by-query`,
    keywords:`${baseUrl}/charts/top-keywords`,
    fallbackRate:`${baseUrl}/charts/fallback-rate`,
    queryAccuracy:`${baseUrl}/charts/query-accuracy`,
}
export default requests;


  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove token
  //   setIsAuthenticated(false);
  //   navigate("/login");
  //   message.success("Logged out successfully");
  // };