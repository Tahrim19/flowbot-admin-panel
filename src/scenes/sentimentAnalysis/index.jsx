// import React, { useEffect, useState } from "react";
// import { Typography, Card, List, Divider, Row, Col, message, Spin } from "antd";
// import AreaChart from "../../components/AreaChart";
// import { useTheme } from "../../theme";
// import axios from "axios";
// import requests from "../../Requests";

// const SentimentAnalysis = () => {
//   const { theme } = useTheme();
//   const { token } = theme;

//   // State for API data
//   const [sentimentTrends, setSentimentTrends] = useState([]);
//   const [sentimentDistribution, setSentimentDistribution] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch sentiment data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const authToken = localStorage.getItem("token");
//         const bId = localStorage.getItem("businessId");

//         if (!authToken || !bId) {
//           message.error("Unauthorized: Missing credentials");
//           setError("Unauthorized access.");
//           return;
//         }

//         // Fetch data in parallel
//         const [trendsResponse, distributionResponse] = await Promise.all([
//           axios.get(requests.sentimentTrends, {
//             headers: { "x-access-token": authToken, "x-business-id": bId },
//           }),
//           axios.get(requests.sentimentDistribution, {
//             headers: { "x-access-token": authToken, "x-business-id": bId },
//           }),
//         ]);

//         // Update state with API data
//         setSentimentTrends(trendsResponse.data);
//         setSentimentDistribution(distributionResponse.data);

//       } catch (error) {
//         message.error("Failed to fetch sentiment data.");
//         console.error("Error fetching sentiment data:", error);
//         setError("Error fetching sentiment data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: token.colorBgBase,
//         color: token.colorTextBase,
//         marginLeft: "210px",
//       }}
//     >
//       {/* Header */}
//       <Typography.Title
//         level={2}
//         style={{
//           marginBottom: "1.5rem",
//           color: token.colorTextBase,
//           letterSpacing: "2px",
//         }}
//       >
//         Sentiment Analysis
//       </Typography.Title>

//       <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
//         Understand the sentiment trends and distribution across user
//         interactions.
//       </Typography.Paragraph>

//       {/* Show loading spinner or error message */}
//       {loading ? (
//         <Spin
//           size="large"
//           style={{ display: "block", textAlign: "center", marginTop: "50px" }}
//         />
//       ) : error ? (
//         <Typography.Text type="danger">{error}</Typography.Text>
//       ) : (
//         <Row gutter={[20, 20]}>
//           {/* Sentiment Trends Over Time */}
//           <Col xs={24} sm={24} md={12} lg={14}>
//             <Card
//               title="Sentiment Trends Over Time"
//               bordered={false}
//               style={{
//                 padding: "20px",
//                 backgroundColor: token.colorBgContainer,
//                 height: "500px",
//               }}
//             >
//               <div style={{ marginTop: "-20px" }}>
//                 <AreaChart data={sentimentTrends} />
//               </div>
//             </Card>
//           </Col>

//           {/* Sentiment Distribution by Query Text */}
//           <Col xs={24} sm={24} md={12} lg={10}>
//             <Card
//               title="Sentiment Distribution by Query Text"
//               bordered={false}
//               style={{
//                 padding: "20px",
//                 backgroundColor: token.colorBgContainer,
//               }}
//             >
//               <List
//                 dataSource={sentimentDistribution}
//                 renderItem={(item, index) => (
//                   <React.Fragment key={index}>
//                     <List.Item>
//                       <List.Item.Meta
//                         title={`Query: "${JSON.parse(item.query).text}"`}
//                         description={`Sentiment: ${item.sentiment}`}
//                       />
//                     </List.Item>
//                     {index < sentimentDistribution.length - 1 && <Divider />}
//                   </React.Fragment>
//                 )}
//               />
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </div>
//   );
// };

// export default SentimentAnalysis;

import React, { useEffect, useState } from "react";
import { Typography, Card, List, Divider, Row, Col, message, Spin } from "antd";
import { useTheme } from "../../theme";
import axios from "axios";
import requests from "../../Requests";

const SentimentAnalysis = () => {
  const { theme } = useTheme();
  const { token } = theme;

  // State for API data
  const [sentimentDistribution, setSentimentDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sentiment data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("token");
        const bId = localStorage.getItem("businessId");

        if (!authToken || !bId) {
          message.error("Unauthorized: Missing credentials");
          setError("Unauthorized access.");
          return;
        }

        // Fetch data 
        const distributionResponse = await axios.get(
          requests.sentimentDistribution,
          {
            headers: { "x-access-token": authToken, "x-business-id": bId },
          }
        );

        // Update state with API data
        setSentimentDistribution(distributionResponse.data);
      } catch (error) {
        message.error("Failed to fetch sentiment data.");
        console.error("Error fetching sentiment data:", error);
        setError("Error fetching sentiment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: token.colorBgBase,
        color: token.colorTextBase,
        marginLeft: "210px",
      }}
    >
      {/* Header */}
      <Typography.Title
        level={2}
        style={{
          marginBottom: "1.5rem",
          color: token.colorTextBase,
          letterSpacing: "2px",
        }}
      >
        Sentiment Analysis
      </Typography.Title>

      <Typography.Paragraph style={{ marginBottom: "1.5rem" }}>
        Understand the sentiment trends and distribution across user
        interactions.
      </Typography.Paragraph>

      {/* Show loading spinner or error message */}
      {loading ? (
        <Spin
          size="large"
          style={{ display: "block", textAlign: "center", marginTop: "50px" }}
        />
      ) : error ? (
        <Typography.Text type="danger">{error}</Typography.Text>
      ) : (
        <Row gutter={[20, 20]}>
          {/* Sentiment Trends Over Time */}
          <Col xs={24} sm={24} md={12} lg={14}>
            <Card
              title="Sentiment Trends Over Time"
              bordered={false}
              style={{
                padding: "20px",
                backgroundColor: token.colorBgContainer,
                height: "500px",
              }}
            >
              <div style={{ marginTop: "-20px" }}>
                {/* <AreaChart data={sentimentTrends} /> */}
              </div>
            </Card>
          </Col>

          {/* Sentiment Distribution by Query Text */}
          <Col xs={24} sm={24} md={12} lg={10}>
            <Card
              title="Sentiment Distribution by Query Text"
              bordered={false}
              style={{
                padding: "20px",
                backgroundColor: token.colorBgContainer,
              }}
            >
              <List
                dataSource={sentimentDistribution}
                renderItem={(item, index) => (
                  <React.Fragment key={index}>
                    <List.Item>
                      <List.Item.Meta
                        title={`Query: "${JSON.parse(item.query).text}"`}
                        description={`Sentiment: ${item.sentiment}`}
                      />
                    </List.Item>
                    {index < sentimentDistribution.length - 1 && <Divider />}
                  </React.Fragment>
                )}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SentimentAnalysis;
