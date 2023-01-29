import { Navigate } from "react-router-dom";
import { useSession } from "../components/sessionProvider";

export default function ProtectedRoute({ children }) {
  const session = useSession();

  if (!session) {
    return <Navigate to="/auth" replace={true} />;
  }

  return children;
}
