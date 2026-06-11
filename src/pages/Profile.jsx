export default function Profile() {
  return (
    <div className="p-6 animate-slideUp">
      <h1 className="text-2xl font-bold text-cyan-400 mb-4">
        👤 User Profile
      </h1>

      <div className="bg-gray-800 p-4 rounded-xl space-y-3">
        <p>Name: Aman Kumar</p>
        <p>Age: 20</p>
        <p>Weight: 68 kg</p>
        <p>Condition: Normal</p>
      </div>
    </div>
  );
}
