import React from "react";
import Topbar from "./scenes/global/Topbar";
import { ThemeProvider } from "./theme";
import Sidebar from "./scenes/global/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import ChatSessions from "./scenes/chatSessions";
import Users from "./scenes/users";
import Documents from "./scenes/documents";
import Analytics from "./scenes/analytics";
import SentimentAnalysis from "./scenes/sentimentAnalysis";
import PlatformInsights from "./scenes/platformInsights";
import Settings from "./scenes/settings";
// import Alerts from "./scenes/alerts";
import Reports from "./scenes/reports";
import HelpSupport from "./scenes/help";


export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chatSessions" element={<ChatSessions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sentimentAnalysis" element={<SentimentAnalysis />} />
            <Route path="/platformInsights" element={<PlatformInsights />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/alerts" element={<Alerts />} /> */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/help" element={<HelpSupport />} />{" "}
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}
