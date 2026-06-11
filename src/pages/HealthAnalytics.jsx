export default function HealthAnalytics() {
  return (
    <div className="bg-health animated-bg min-h-[calc(100vh-56px)] p-8 animate-slideUp">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape square"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
      </div>
      <div className="mb-6">
        <img
          src="/assets/banner-health.svg"
          alt="Analytics banner"
          className="w-full h-32 object-cover rounded-lg shadow-md mb-4"
        />
      </div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        🩺 Health Analytics
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Temperature" value="36.8 °C" icon="🌡️" />
        <Card title="SpO₂" value="98%" icon="🫁" />
        <Card title="Stress" value="Normal" icon="🧠" />
        <Card title="BP" value="120/80" icon="🩸" />
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="glass hover-glow float p-6 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-gray-300">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
