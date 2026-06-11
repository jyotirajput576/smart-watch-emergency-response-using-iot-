import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider, useUser } from "./context/UserContext";

import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Dashboard from "./pages/Dashboard";
import HealthAnalytics from "./pages/HealthAnalytics";
import Emergency from "./pages/Emergency";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TestCenter from "./pages/TestCenter";

function AuthRedirect() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && window.location.pathname !== "/register" && window.location.pathname !== "/login") {
      navigate("/register");
    }
  }, [user, navigate]);
  return null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <AuthRedirect />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/health" element={<HealthAnalytics />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/test" element={<TestCenter />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
