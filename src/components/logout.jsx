import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    }
    navigate("/");
  };

  return (
    <div>
      <button
        className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
