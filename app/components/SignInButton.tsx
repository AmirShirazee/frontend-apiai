"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface SigninButtonProps {
  session: Session | null;
}

const SigninButton: React.FC<SigninButtonProps> = ({ session }) => {
  const borderGradient = `border-2 border-gradient-to-r from-blue-500 to-purple-600`;
  const transparentBg = `bg-transparent`;
  const router = useRouter();

  if (session && session.user) {
    return (
      <ul className="flex grow justify-end flex-wrap items-center">
        <li>
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
            className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
          >
            <span className="relative inline-flex items-center">
              Sign Out{" "}
              <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </span>
          </button>
        </li>
        <li className="ml-6">
          <Link
            href="/dashboard"
            className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
          >
            <span className="relative inline-flex items-center">
              To Dashboard{" "}
              <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </span>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex grow justify-end flex-wrap items-center">
      <li>
        <Link
          href="/signin"
          className="font-medium text-sm text-slate-300 hover:text-white transition duration-150 ease-in-out"
        >
          Sign in
        </Link>
      </li>
      <li className="ml-6">
        <Link
          className="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
          href="/signup"
        >
          <span className="relative inline-flex items-center">
            Sign up{" "}
            <span className="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              -&gt;
            </span>
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default SigninButton;
