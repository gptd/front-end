import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";

export const SessionContext = createContext();
export const useSession = () => useContext(SessionContext);

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return null;
      }

      console.log(data);

      if (data && data.session) return setSession(data.session);
    };

    supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
