import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user_profile");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    try {
      const raw = localStorage.getItem("voice_enabled");
      return raw ? JSON.parse(raw) : true;
    } catch (e) {
      return true;
    }
  });

  const [lastAlert, setLastAlert] = useState(null);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("user_profile", JSON.stringify(user));
      else localStorage.removeItem("user_profile");
    } catch (e) {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("voice_enabled", JSON.stringify(voiceEnabled));
    } catch (e) {}
  }, [voiceEnabled]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        voiceEnabled,
        setVoiceEnabled,
        lastAlert,
        setLastAlert,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

