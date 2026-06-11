import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

function recommendMeds(alert, user) {
  if (!alert) return [];
  const meds = [];
  if (alert.type === "danger") {
    meds.push({ name: "Aspirin", reason: "Reduce cardiac strain (consult doctor)" });
    meds.push({ name: "Nitroglycerin", reason: "For suspected angina (if prescribed)" });
  } else if (alert.type === "warning") {
    meds.push({ name: "Diazepam", reason: "For severe anxiety/panic (if prescribed)" });
    meds.push({ name: "Salbutamol Inhaler", reason: "For breathing issues (if asthma)" });
  }
  // Tailor to conditions
  if (user?.diabetic) meds.push({ name: "Glucose Gel", reason: "For low blood sugar events" });
  return meds;
}

function findNearbySimulated(lat, lng) {
  // Simple static dataset; in production replace with a Places API call
  const all = [
    { name: "City Hospital", type: "Hospital", distance_km: 0.9 },
    { name: "24/7 Pharmacy", type: "Pharmacy", distance_km: 0.7 },
    { name: "Central Clinic", type: "Clinic", distance_km: 1.8 },
  ];
  return all;
}

export default function Emergency() {
  const { user, lastAlert } = useUser();
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setNearby(findNearbySimulated(latitude, longitude));
        },
        () => setNearby(findNearbySimulated())
      );
    } else {
      setNearby(findNearbySimulated());
    }
  }, []);

  const meds = recommendMeds(lastAlert, user);

  return (
    <div className="bg-emergency animated-bg min-h-[calc(100vh-56px)] p-8 animate-slideUp emergency-blink">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape square"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
      </div>
      {/* banner or background decorative image */}
      <div className="w-full mb-6 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/assets/banner-emergency.svg"
          alt="Emergency banner"
          className="w-full h-40 object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-red-400 mb-6">🚨 Emergency</h1>

      <div className="glass p-5 rounded-xl mb-6">
        <div className="font-semibold text-red-200">Immediate Actions</div>
        <ul className="text-red-200 mb-2">
          <li>• Sit or lie down immediately</li>
          <li>• Stay calm</li>
          <li>• Call emergency services</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass p-4 rounded-xl">
          <div className="text-lg font-semibold mb-2">AI Alert</div>
          <div className="text-sm text-red-200">{lastAlert?.message || 'No critical alerts at the moment.'}</div>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="text-lg font-semibold mb-2">Suggested Medication</div>
          {meds.length ? (
            <ul className="text-sm">
              {meds.map((m, i) => (
                <li key={i} className="mb-1">
                  <strong>{m.name}</strong> — {m.reason}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-300">No suggestions available. Follow medical advice.</div>
          )}
        </div>
      </div>

      <div className="glass p-4 rounded-xl mb-6">
        <div className="text-lg font-semibold mb-2">Nearby Hospitals & Pharmacies</div>
        <ul>
          {nearby.map((n, i) => (
            <li key={i} className="mb-1">
              <strong>{n.name}</strong> — {n.type} — {n.distance_km} km
            </li>
          ))}
        </ul>
      </div>

      <button className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-2xl text-xl font-bold animate-bounce">
        🚑 SOS
      </button>
    </div>
  );
}
