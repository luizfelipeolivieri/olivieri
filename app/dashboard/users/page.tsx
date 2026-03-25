"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { supabase } from "@/services/supabaseClient";
import { updateUserRole } from "@/services/userService";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.admin.listUsers();
      setUsers(data.users);
    }

    load();
  }, []);

  async function handleChange(userId: string, role: string) {
    await updateUserRole(userId, role);
    alert("Atualizado!");
  }

  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />

      <main className="ml-20 mt-16 p-6">
        <h1 className="text-2xl mb-6">Usuários</h1>

        <table className="min-w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handleChange(u.id, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  );
}
