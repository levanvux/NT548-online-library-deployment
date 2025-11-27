"use client";

import { useState } from "react";
import Logo from "@/components/common/Logo";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import ForgotPassword from "@/components/auth/ForgotPassword";

export default function AuthPage() {
  const [authProcess, setAuthProcess] = useState<
    "login" | "register" | "forgot-password"
  >("login");

  // Wrapper to satisfy child components expecting (value: string) => void
  const handleSetAuthProcess = (value: string) => {
    setAuthProcess(value as "login" | "register" | "forgot-password");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[url('/images/backgrounds/background-login-register.jpg')] bg-cover bg-center">
      <div className="flex w-96 flex-col gap-3 rounded bg-white p-4">
        <Logo />

        {authProcess === "login" && (
          <Login setAuthProcess={handleSetAuthProcess} />
        )}
        {authProcess === "register" && (
          <Register setAuthProcess={handleSetAuthProcess} />
        )}
        {authProcess === "forgot-password" && (
          <ForgotPassword setAuthProcess={handleSetAuthProcess} />
        )}
      </div>
    </div>
  );
}
