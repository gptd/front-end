import { Link } from "react-router-dom";

export default function Auth() {
  return (
    <>
      <Link
        className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400 text-center"
        to="/auth/register"
      >
        Register
      </Link>
      <Link
        className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400 text-center"
        to="/auth/login"
      >
        Login
      </Link>
    </>
  );
}
