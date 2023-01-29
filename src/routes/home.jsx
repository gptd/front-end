import AboutIcon from "../assets/about.svg";
import ShareIcon from "../assets/share.svg";

import { useState, useContext } from "react";
import { SessionContext } from "../components/sessionProvider";
import { Link } from "react-router-dom";

function App() {
  const session = useContext(SessionContext);

  const [query, setQuery] = useState("");

  return (
    <div className="w-screen h-screen h-[100dvh] bg-slate-600 flex flex-col pt-4 pb-12 px-6 gap-2 md:w-2/5 md:mx-auto">
      <header className="flex flex-col gap-4 mb-2">
        <nav className="flex flex-row gap-4 justify-end">
          <a href="/share" className="flex flex-row gap-1 font-semibold">
            <img src={ShareIcon} alt="Share" width={24} height={24} />
            share
          </a>
          <a
            href="/about"
            className="flex flex-row items-center gap-1 font-semibold"
          >
            <img src={AboutIcon} alt="About" width={24} height={24} />
            about
          </a>
          {session !== null && (
            <Link to="/auth/logout" className="font-semibold">
              logout
            </Link>
          )}
          {!session && (
            <Link to="/auth" className="font-semibold">
              login
            </Link>
          )}
        </nav>
        <h1 className="text-4xl font-bold">Have I been GPT'd?</h1>
      </header>
      <textarea
        className="rounded-xl shadow-inset flex-grow shadow-inner p-4 text-black"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Link
        className="rounded-xl bg-teal-600 px-4 py-3 shadow-xl hover:bg-teal-400 text-center"
        to={`/results?${new URLSearchParams({ query }).toString()}`}
      >
        Check
      </Link>
    </div>
  );
}

export default App;
