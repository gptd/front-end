import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";

export const SessionContext = createContext();

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);

      const { listener } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session?.session ?? null);
        setLoading(false);
      });
    };

    getSession();
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      {!loading && children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  return useContext(SessionContext);
};
