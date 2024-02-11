import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton: React.FC = () => (
  <button
    onClick={() => signOut({ callbackUrl: "http://localhost:8080/signin" })}
  >
    Log Out
  </button>
);

export default LogoutButton;
