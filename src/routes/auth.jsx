import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="w-screen h-screen h-[100dvh] bg-slate-600 flex flex-col pt-4 pb-12 px-6 md:w-2/5 md:mx-auto items-center justify-center gap-4">
      <header>
        <Link to="/">
          <h1 className="text-4xl font-bold">GPT'd?</h1>
        </Link>
      </header>
      <div className="flex flex-col gap-4">
        <Outlet />
      </div>
    </div>
  );
}
