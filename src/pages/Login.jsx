import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="bg-dashboard animated-bg min-h-screen flex items-center justify-center">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape square"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
      </div>
      <div className="glass p-8 w-80 text-center animate-slideUp">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          🔐 Login
        </h2>

        <input
          className="w-full p-2 mb-3 bg-black/40 rounded"
          placeholder="Email"
        />
        <input
          className="w-full p-2 mb-4 bg-black/40 rounded"
          placeholder="Password"
        />

        <button
          onClick={() => navigate("/register")}
          className="bg-cyan-500 text-black w-full py-2 rounded-xl font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
