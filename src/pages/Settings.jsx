import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Settings() {
  const { voiceEnabled, setVoiceEnabled, user, setUser } = useUser();

  // Theme selector: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'system';
    } catch { return 'system'; }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme','dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme','light');
      } else {
        // system: remove saved preference and apply system preference
        localStorage.removeItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
       }
    } catch (e) {}
  }, [theme]);

  // Profile editor state
  const [editing, setEditing] = useState(false);
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
    photo: null, // Blob or url string
  });

  useEffect(() => {
    if (user) {
      // convert any stale blob URL to null since object URLs don't persist across reloads
      const updated = { ...user };
      if (updated.photo && updated.photo.startsWith('blob:')) {
        updated.photo = null;
      }
      setForm(updated);
    }
  }, [user]);

  function addContact(input) {
    if (!input) return;
    setForm(f => ({ ...f, emergencyContacts: [...(f.emergencyContacts||[]), input] }));
  }

  function removeContact(idx) {
    setForm(f => ({ ...f, emergencyContacts: f.emergencyContacts.filter((_,i)=>i!==idx) }));
  }

  function saveProfile(e) {
    e?.preventDefault?.();
    setUser(form);
    setEditing(false);
  }

  return (
    <div className="bg-settings animated-bg min-h-screen p-8 animate-slideUp">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape triangle"></div>
        <div className="shape square"></div>
        <div className="shape hexagon"></div>
        <div className="shape diamond"></div>
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        ⚙️ Settings
      </h1>

      {/* decorative banner image */}
      <div className="w-full mb-6">
        <img
          src="/assets/banner-settings.svg"
          alt="Health banner"
          className="w-full h-40 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="glass p-4 flex justify-between items-center mb-4">
        <span>🔊 Voice Alerts</span>
        <input
          type="checkbox"
          checked={voiceEnabled}
          onChange={() => setVoiceEnabled(!voiceEnabled)}
        />
      </div>

      <div className="glass p-4 mb-4">
        <div className="font-semibold mb-2">🎨 Theme</div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2"><input type="radio" name="theme" checked={theme==='light'} onChange={()=>setTheme('light')} /> Light</label>
          <label className="flex items-center gap-2"><input type="radio" name="theme" checked={theme==='dark'} onChange={()=>setTheme('dark')} /> Dark</label>
          <label className="flex items-center gap-2"><input type="radio" name="theme" checked={theme==='system'} onChange={()=>setTheme('system')} /> System</label>
        </div>
      </div>

      <div className="glass p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
            <div className="font-semibold flex items-center gap-2">👤 Profile</div>
            <div>
              <button
                onClick={()=>setEditing(e=>!e)}
                className="px-3 py-1 rounded bg-cyan-400"
              >
                {editing? 'Cancel' : (user? 'Edit Profile' : 'Create Profile')}
              </button>
            </div>
          </div>
          {!editing && (
            <div className="mb-4 flex justify-center">
              <img
                src={user?.photo || "/assets/default-avatar.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400"
              />
            </div>
          )}
        {editing ? (
          <form onSubmit={saveProfile} className="space-y-3 animate-fadeIn">            {/* profile picture upload */}
            <div className="flex flex-col items-center">
              {(form.photo || user?.photo) && (
                <div className="relative">
                  <img
                    src={form.photo || user?.photo || "/assets/default-avatar.svg"}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, photo: null }))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setForm(f => ({ ...f, photo: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>            <input className="w-full p-2 rounded" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
            <input className="w-full p-2 rounded" placeholder="Age" value={form.age} onChange={(e)=>setForm({...form, age:e.target.value})} />
            <input className="w-full p-2 rounded" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
            <input className="w-full p-2 rounded" placeholder="Blood Group" value={form.bloodGroup} onChange={(e)=>setForm({...form, bloodGroup:e.target.value})} />
            <textarea className="w-full p-2 rounded" placeholder="Allergies / Notes" value={form.allergies} onChange={(e)=>setForm({...form, allergies:e.target.value})} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.bpPatient} onChange={(e)=>setForm({...form, bpPatient:e.target.checked})} /> BP Patient</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.heartPatient} onChange={(e)=>setForm({...form, heartPatient:e.target.checked})} /> Heart Patient</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.diabetic} onChange={(e)=>setForm({...form, diabetic:e.target.checked})} /> Diabetic</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.asthma} onChange={(e)=>setForm({...form, asthma:e.target.checked})} /> Asthma</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.anxiety} onChange={(e)=>setForm({...form, anxiety:e.target.checked})} /> Anxiety</label>
            </div>

            <div>
              <label className="text-sm">Add Emergency Contact</label>
              <EmergencyContactInput onAdd={addContact} />
              <ul className="mt-2">
                {(form.emergencyContacts||[]).map((c,i)=> (
                  <li key={i} className="flex justify-between items-center">
                    <span>{c}</span>
                    <button type="button" onClick={()=>removeContact(i)} className="text-sm text-red-400">Remove</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button type="submit" className="px-4 py-2 bg-cyan-400 rounded">Save</button>
            </div>
          </form>
        ) : (
          <div>
            {user ? (
              <div className="text-sm">
                <div><strong>{user.name}</strong> • {user.age} • {user.phone}</div>
                <div>Blood: {user.bloodGroup || 'Not set'}</div>
                <div>Allergies: {user.allergies || 'None'}</div>
                <div>Emergency Contacts: {(user.emergencyContacts||[]).join(', ') || 'None'}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-400">No profile yet. Click "Create Profile" to get started.</div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

function EmergencyContactInput({ onAdd }) {
  const [v, setV] = useState("");
  return (
    <div className="flex gap-2 mt-2">
      <input value={v} onChange={(e)=>setV(e.target.value)} className="flex-1 p-2 rounded" placeholder="Name - Phone" />
      <button type="button" onClick={()=>{ onAdd(v); setV(""); }} className="px-3 py-1 bg-cyan-400 rounded">Add</button>
    </div>
  );
}
