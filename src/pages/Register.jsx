import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    bloodGroup: "",
    allergies: "",
    bpPatient: false,
    heartPatient: false,
    diabetic: false,
    asthma: false,
    anxiety: false,
    emergencyContacts: [],
  });

  const [contactInput, setContactInput] = useState("");

  function addContact() {
    if (!contactInput) return;
    setForm((f) => ({ ...f, emergencyContacts: [...f.emergencyContacts, contactInput] }));
    setContactInput("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUser(form);
    navigate("/");
  }

  return (
    <div className="bg-dashboard min-h-screen p-8 animate-slideUp">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">📝 Register Health Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm text-gray-300">Name</label>
          <input className="w-full p-2 rounded" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Age</label>
          <input type="number" className="w-full p-2 rounded" value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})} />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Phone</label>
          <input className="w-full p-2 rounded" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Blood Group</label>
          <input className="w-full p-2 rounded" value={form.bloodGroup} onChange={(e)=>setForm({...form, bloodGroup:e.target.value})} />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Allergies / Notes</label>
          <textarea className="w-full p-2 rounded" value={form.allergies} onChange={(e)=>setForm({...form, allergies:e.target.value})} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.bpPatient} onChange={(e)=>setForm({...form, bpPatient:e.target.checked})} /> <span>BP Patient</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.heartPatient} onChange={(e)=>setForm({...form, heartPatient:e.target.checked})} /> <span>Heart Patient</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.diabetic} onChange={(e)=>setForm({...form, diabetic:e.target.checked})} /> <span>Diabetic</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.asthma} onChange={(e)=>setForm({...form, asthma:e.target.checked})} /> <span>Asthma</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.anxiety} onChange={(e)=>setForm({...form, anxiety:e.target.checked})} /> <span>Anxiety / Panic</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-sm text-gray-300 mb-1">Emergency Contacts</div>
          <div className="flex gap-2">
            <input className="flex-1 p-2 rounded" value={contactInput} onChange={(e)=>setContactInput(e.target.value)} placeholder="Name - Phone" />
            <button type="button" onClick={addContact} className="px-3 py-1 bg-cyan-400 rounded">Add</button>
          </div>
          <ul className="mt-2 text-sm text-gray-300">
            {form.emergencyContacts.map((c, i)=> <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div>
          <button type="submit" className="px-5 py-2 bg-cyan-400 rounded font-semibold">Save Profile</button>
        </div>
      </form>
    </div>
  );
}
