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
          <div className="py-6 gap-1 ml-4 flex flex-row items-center">
            <a
              href="/share"
              className="flex flex-row gap-1 items-center -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6  hover:bg-gray-400/10"
            >
              <img
                src={ShareIcon}
                alt="Share"
                width={40}
                height={40}
                className="md:object-scale-down"
              />
              Share
            </a>
          </div>

          <div className="py-6 gap-1 ml-4 flex flex-row items-center">
            <a
              href="/about"
              className="flex flex-row gap-1 items-center -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6  hover:bg-gray-400/10"
            >
              <img
                src={AboutIcon}
                alt="About"
                width={40}
                height={40}
                className="md:object-scale-down"
              />
              About
            </a>
          </div>

          <div className="py-6 gap-1 ml-4 flex flex-row items-center">
            {session !== null && (
              <Link
                to="/auth/logout"
                className="flex flex-row gap-1 items-center -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6  hover:bg-gray-400/10"
              >
                Logout
              </Link>
            )}
            {!session && (
              <Link
                to="/auth"
                className="flex flex-row gap-1 items-center -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6  hover:bg-gray-400/10"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        <h1 className="text-4xl font-bold">Have I been GPT'd?</h1>
      </header>
      <textarea className="rounded-xl shadow-inset flex-grow shadow-inner p-4 text-black" />
      <button className="rounded-xl bg-teal-600 text-base px-4 py-3 shadow-xl hover:bg-teal-400">
        Check
      </button>
    </div>
  );
}

export default App;
