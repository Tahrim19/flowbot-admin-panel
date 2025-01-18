export const mockPieData = [
  { id: "Web", label: "Web", value: 55, color: "#007BFF" },
  { id: "WhatsApp", label: "WhatsApp", value: 35, color: "#25D366" },
  { id: "Mobile App", label: "Mobile App", value: 10, color: "#FF9900" },
];

export const mockLineData = [
  {
    "id": "Positive",
    "color": "#3c9ae8",
    "data": [
      { "x": "Mon", "y": 45 },
      { "x": "Tue", "y": 50 },
      { "x": "Wed", "y": 55 },
      { "x": "Thu", "y": 48 },
      { "x": "Fri", "y": 60 },
      { "x": "Sat", "y": 65 },
      { "x": "Sun", "y": 58 }
    ]
  },
  {
    "id": "Neutral",
    "color": "#65b7f3",
    "data": [
      { "x": "Mon", "y": 35 },
      { "x": "Tue", "y": 32 },
      { "x": "Wed", "y": 30 },
      { "x": "Thu", "y": 28 },
      { "x": "Fri", "y": 34 },
      { "x": "Sat", "y": 30 },
      { "x": "Sun", "y": 33 }
    ]
  },
  {
    "id": "Negative",
    "color": "#8dcff8",
    "data": [
      { "x": "Mon", "y": 20 },
      { "x": "Tue", "y": 18 },
      { "x": "Wed", "y": 15 },
      { "x": "Thu", "y": 24 },
      { "x": "Fri", "y": 20 },
      { "x": "Sat", "y": 25 },
      { "x": "Sun", "y": 22 }
    ]
  }
];

// smaple line chart data for analytics
export const data = [
  {
    id: "Accuracy",
    color: "hsl(210, 70%, 50%)", // Optional, for custom colors
    data: [
      { x: "January", y: 85 },
      { x: "February", y: 90 },
      { x: "March", y: 88 },
      { x: "April", y: 92 },
      { x: "May", y: 87 },
    ],
  },
  {
    id: "Answered Queries",
    color: "hsl(120, 70%, 50%)", // Optional
    data: [
      { x: "January", y: 120 },
      { x: "February", y: 150 },
      { x: "March", y: 135 },
      { x: "April", y: 160 },
      { x: "May", y: 145 },
    ],
  },
  {
    id: "Unanswered Queries",
    color: "hsl(10, 70%, 50%)", // Optional
    data: [
      { x: "January", y: 30 },
      { x: "February", y: 25 },
      { x: "March", y: 40 },
      { x: "April", y: 35 },
      { x: "May", y: 20 },
    ],
  },
];

export const mockDocuments = [
  {
    id: 1,
    name: "Document1.pdf",
    language: "English",
    lastQueried: "2024-12-20",
    totalQueries: 15,
  },
  {
    id: 2,
    name: "Document2.pdf",
    language: "Arabic",
    lastQueried: "2024-12-18",
    totalQueries: 8,
  },
];


// Mock Data for Users
export const mockUsers = [
  {
    id: 1,
    phoneNumber: "+1234567890",
    totalSessions: 15,
    lastActive: "2024-12-01",
    totalMessages: 120,
    retentionRate: "85%",
  },
  {
    id: 2,
    phoneNumber: "+0987654321",
    totalSessions: 10,
    lastActive: "2024-11-28",
    totalMessages: 80,
    retentionRate: "90%",
  },
  // Add more mock user data here
];



export const mockChatSessions = [
  {
    id: 1,
    sessionId: "S123",
    userId: "U001",
    startTime: "2023-12-01T09:00:00",
    endTime: "2023-12-01T09:30:00",
    totalMessages: 25,
    avgResponseTime: 1500,
    status: "completed",
  },
  {
    id: 2,
    sessionId: "S124",
    userId: "U002",
    startTime: "2023-12-01T10:00:00",
    endTime: "2023-12-01T10:20:00",
    totalMessages: 15,
    avgResponseTime: 1200,
    status: "active",
  },
  {
    id: 3,
    sessionId: "S125",
    userId: "U003",
    startTime: "2023-12-02T08:00:00",
    endTime: "2023-12-02T08:45:00",
    totalMessages: 30,
    avgResponseTime: 1800,
    status: "completed",
  },
];