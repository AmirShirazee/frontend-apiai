import Logo from "./logo";
import SigninButton from "../../SignInButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo/>
          </div>

          <nav className="hidden md:flex md:grow">

            {/* Desktop menu links */}
            <ul className="flex grow justify-center flex-wrap items-center">
              <li>
                <Link
                    className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                    href="/about">About</Link>
              </li>
              <li>
                <Link
                    className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                    href="/integrations">Integrations</Link>
              </li>
              <li>
                <Link
                    className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                    href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link
                    className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                    href="/customers">Customers</Link>
              </li>
              <li>
                <Link
                    className="font-medium text-sm text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                    href="/changelog">Changelog</Link>
              </li>
            </ul>

          </nav>

          {/* Desktop navigation */}
          <nav className="flex grow">
            <SigninButton session={session}/>
          </nav>
        </div>
      </div>
    </header>
  );
}
