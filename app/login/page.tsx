"use client";

import { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (!error) {
      router.push("/dashboard");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-80">
        <h1 className="text-xl mb-4">Login</h1>

        <input
          className="w-full mb-2 p-2 rounded bg-slate-700"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 rounded bg-slate-700"
          placeholder="Senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="w-full bg-blue-600 p-2 rounded">
          Entrar
        </button>
      </div>
    </div>
  );
}
