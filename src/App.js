// import { useState } from "react";
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
import Settings from "./scenes/configurations";
// import Alerts from "./scenes/alerts";
// import Reports from "./scenes/reports";
// import HelpSupport from "./scenes/help";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./scenes/login";
import Logout from "./scenes/logout";


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
 {isAuthenticated ? (
        <div className="app">
          <Sidebar setIsAuthenticated={setIsAuthenticated} />
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
              {/* <Route path="/reports" element={<Reports />} /> */}
              {/* <Route path="/help" element={<HelpSupport />} /> */}
              <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </ThemeProvider>
  );
}
