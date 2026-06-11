import { useEffect, useState, useMemo } from "react";
import { useUser } from "../context/UserContext";
import { speak } from "../utils/voiceAlert";
import AdvancedAlertEngine from "../utils/advancedAlertEngine";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [heartRate, setHeartRate] = useState(78);
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 });
  const [oxygen, setOxygen] = useState(98);
  const [temperature, setTemperature] = useState(37);
  const [history, setHistory] = useState([
    { time: new Date().toLocaleTimeString(), bpm: 78 },
  ]);
  const [paused, setPaused] = useState(false);

  // ✅ useUser ONLY ONCE
  const { user, voiceEnabled, setLastAlert } = useUser();

  // ✅ navigate INSIDE component
  const navigate = useNavigate();

  // Initialize alert engine with user profile
  const alertEngine = useMemo(() => new AdvancedAlertEngine(user), [user]);

  // ---- SIMULATED LIVE DATA WITH MULTIPLE VITALS ----
  const stressLevel = heartRate > 110 ? "High" : "Normal";

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) return;
      
      // Generate realistic vital signs with correlation
      const newHr = Math.floor(Math.random() * (140 - 65) + 65);
      const baseSystolic = newHr > 100 ? 130 + Math.random() * 20 : 115 + Math.random() * 15;
      const baseDiastolic = newHr > 100 ? 85 + Math.random() * 15 : 75 + Math.random() * 10;
      
      setHeartRate(newHr);
      setBloodPressure({
        systolic: Math.round(baseSystolic),
        diastolic: Math.round(baseDiastolic),
      });
      setOxygen(Math.max(85, Math.min(100, 98 - Math.random() * 8)));
      setTemperature(36.8 + (Math.random() - 0.5) * 1);
      
      setHistory((h) => [
        ...h.slice(-19),
        { time: new Date().toLocaleTimeString(), bpm: newHr },
      ]);
    }, 2500);
    return () => clearInterval(interval);
  }, [paused]);

  // ---- ADVANCED AI ALERT LOGIC ----
  function getAIAlert() {
    const alert = alertEngine.getComprehensiveAlert({
      heartRate,
      bloodPressure,
      oxygen,
      temperature,
      stressLevel,
      bloodSugar: user?.diabetic ? 120 : 100, // Placeholder
    });
    return alert;
  }


  // ✅ alert calculated ONCE
  const alert = getAIAlert();

  // Persist last alert to global context so other pages (Emergency) can read it
  useEffect(() => {
    setLastAlert(alert);
  }, [alert, setLastAlert]);

  // ---- VOICE ALERT ----
  useEffect(() => {
    if (alert.type !== "safe" && voiceEnabled) {
      speak(alert.message);
    }
  }, [alert, voiceEnabled]);

  // ---- AUTO EMERGENCY REDIRECT ----
  useEffect(() => {
    if (alert.type === "danger") {
      const timer = setTimeout(() => {
        navigate("/emergency");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alert, navigate]);

  // ---- IN-APP ALERT BANNER ----
  function AlertBanner() {
    if (alert.type === "safe") return null;
    return (
      <div className="fixed right-4 bottom-6 w-80 glass p-4 rounded-xl">
        <div className="font-semibold mb-1">{alert.type === 'danger' ? 'Critical Alert' : 'Warning'}</div>
        <div className="text-sm text-gray-300 mb-2">{alert.message}</div>
        <div className="flex gap-2 justify-end">
          <button onClick={() => navigate('/emergency')} className="px-3 py-1 bg-red-500 rounded text-white">Go to Emergency</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dashboard animated-bg min-h-[calc(100vh-56px)] p-8 animate-slideUp">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape square"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
      </div>
      {/* HEADER */}
      <div className="mb-6">
        <img
          src="/assets/banner-dashboard.svg"
          alt="Dashboard Banner"
          className="w-full h-40 object-cover rounded-lg shadow-md mb-4"
        />
        <h1 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
          ⌚ Dashboard
        </h1>
      </div>

      {/* HEART RATE */}
      <div className="flex justify-center mb-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400 opacity-30 animate-ping"></div>
          <div className="w-40 h-40 rounded-full glass glow flex flex-col items-center justify-center">
            <span className="text-4xl">❤️</span>
            <span className="text-3xl font-bold">{heartRate}</span>
            <span className="text-sm text-gray-400">BPM</span>
          </div>
        </div>
      </div>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard
          title="BP"
          value={`${bloodPressure.systolic}/${bloodPressure.diastolic}`}
          color={bloodPressure.systolic > 140 ? "red" : "blue"}
        />
        <StatusCard
          title="Oxygen"
          value={`${oxygen.toFixed(0)}%`}
          color={oxygen < 92 ? "red" : "green"}
        />
        <StatusCard
          title="Temperature"
          value={`${temperature.toFixed(1)}°C`}
          color={temperature > 38 || temperature < 36 ? "red" : "blue"}
        />
        <StatusCard
          title="Stress Level"
          value={stressLevel}
          color={stressLevel === "High" ? "red" : "green"}
        />
      </div>

      {/* AI ALERT */}
      <div
        className={`glass p-5 rounded-xl font-semibold mb-8 ${
          alert.type === "danger"
            ? "text-red-400 emergency-blink border border-red-500/50"
            : alert.type === "warning"
            ? "text-yellow-300 border border-yellow-500/50"
            : "text-green-400 border border-green-500/50"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span>
            {alert.type === "danger" && "🚨"}
            {alert.type === "warning" && "⚠️"}
            {alert.type === "safe" && "✅"} AI Analysis
          </span>
          <span className="text-sm text-gray-400">Confidence: {alert.confidence}%</span>
        </div>
        <p className="text-center text-base">{alert.message}</p>
        {alert.riskFactors && alert.riskFactors.length > 0 && (
          <div className="mt-3 pt-3 border-t border-current/20 text-xs">
            <strong>Risk Factors:</strong> {alert.riskFactors.map(r => r.factor).join(', ')}
          </div>
        )}
      </div>

      {/* HISTORY CHART + CONTROLS */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-cyan-300">Heart Rate History</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaused((p) => !p)}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={() => setHistory([{ time: new Date().toLocaleTimeString(), bpm: heartRate }])}
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="glass p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[50, 150]} />
              <Tooltip />
              <Line type="monotone" dataKey="bpm" stroke="#06b6d4" strokeWidth={3} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-8 text-sm">
        AI-powered personalized health monitoring
      </p>

      <AlertBanner />
    </div>
  );
}

/* STATUS CARD */
function StatusCard({ title, value, color }) {
  const colors = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    blue: "text-cyan-400",
  };

  return (
    <div className="glass hover-glow float p-6 text-center">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className={`text-xl font-bold ${colors[color]}`}>{value}</div>
    </div>
  );
}

