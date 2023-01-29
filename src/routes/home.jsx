import AboutIcon from "../assets/about.svg";
import { Outlet } from "react-router-dom";

import ShareIcon from "../assets/share.svg";
import { useSession } from "../components/sessionProvider";
import { Link } from "react-router-dom";

// Fix Logout showing even though user is not logged in
function App() {
  const session = useSession();

  return (
    <div className="w-screen h-screen h-[100dvh] bg-slate-600 flex flex-col pt-4 pb-12 px-6 gap-2 md:w-2/5 md:mx-auto">
      <header className="flex flex-col gap-4 mb-2">
        <nav className="flex flex-row gap-4 justify-end">
          <a href="/share" className="flex flex-row gap-1 font-semibold">
            <img src={ShareIcon} alt="Share" width={24} height={24} />
            Share
          </a>
          <a
            href="/about"
            className="flex flex-row items-center gap-1 font-semibold"
          >
            <img src={AboutIcon} alt="About" width={24} height={24} />
            About
          </a>
          {session ? (
            <Link to="/auth/logout" className="font-semibold">
              Logout
            </Link>
          ) : (
            <Link to="/auth" className="font-semibold">
              Login
            </Link>
          )}
        </nav>
        <h1 className="text-4xl font-bold">Have I been GPT'd?</h1>
      </header>
      <textarea className="rounded-xl shadow-inset flex-grow shadow-inner p-4" />
      <button className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400">
        Check
      </button>
    </div>
  );
}

export default App;
