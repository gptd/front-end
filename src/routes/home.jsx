import AboutIcon from "../assets/about.svg";
import ShareIcon from "../assets/share.svg";

import { useState, useContext } from "react";
import { SessionContext } from "../components/sessionProvider";
import { Link } from "react-router-dom";

const placeholder =
  "At Radish, we offer a top-notch food delivery service that can cater to the diverse dietary needs and preferences of your team. Whether it's breakfast, lunch, or dinner, our healthy and delicious options will provide a much-needed break from the daily routine, and boost productivity and creativity.\r\nOur service also saves your employees valuable time, as they no longer have to worry about meal planning and preparation. Plus, with our convenient online ordering and delivery system, the entire process is stress-free and efficient.\r\n\r\nAs an AI company, you understand the importance of staying ahead of the curve and providing the latest technology to enhance employee satisfaction. Our food delivery service not only meets this criteria but also helps to create a positive workplace culture, where employees feel valued and appreciated.\r\nI would love the opportunity to discuss this further with you and demonstrate how our service can benefit CohereAI. Please let me know if there is a convenient time for a call or if you have any questions.\r\nThank you for considering Radish.\r\n\r\nBest regards,\r\n\r\nSergio";

function App() {
  const session = useContext(SessionContext);

  const [query, setQuery] = useState(placeholder);

  return (
    <div className="w-screen h-screen h-[100dvh] bg-slate-600 flex flex-col pt-4 pb-12 px-6 gap-2 md:w-2/5 md:mx-auto">
      <header className="flex flex-col gap-4 mb-2">
        <nav className="flex flex-row gap-4 justify-end">
          <div className="gap-1 ml-4 flex flex-row items-center">
            <a
              href="/share"
              className="flex flex-row gap-1 items-center -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6  hover:bg-gray-400/10"
            >
              <img
                src={ShareIcon}
                alt="Share"
                width={24}
                height={24}
                className="md:object-scale-down"
              />
              Share
            </a>
          </div>

          <div className="gap-1 ml-4 flex flex-row items-center">
            <a
              href="/about"
              className="flex flex-row gap-1 items-center -mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6  hover:bg-gray-400/10"
            >
              <img
                src={AboutIcon}
                alt="About"
                width={24}
                height={24}
                className="md:object-scale-down"
              />
              About
            </a>
          </div>

          <div className="gap-1 ml-4 flex flex-row items-center">
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
      <textarea
        className="rounded-xl shadow-inset flex-grow shadow-inner p-4 text-black"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
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
