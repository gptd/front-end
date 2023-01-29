import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const session = useContext(SessionContext);

  if (!session) {
    return <Navigate to="/auth" replace={true} />;
  }

  return children;
}
