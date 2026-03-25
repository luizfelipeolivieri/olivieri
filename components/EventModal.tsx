"use client";

import { useState } from "react";

export default function EventModal({ selectedDate, onSave, onClose }: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-xl w-96">
        <h2 className="mb-4">Nova Tarefa</h2>

        <input
          placeholder="Título"
          className="w-full mb-2 p-2 bg-slate-700"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          className="w-full mb-4 p-2 bg-slate-700"
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          className="bg-blue-600 px-4 py-2 mr-2"
          onClick={() =>
            onSave({
              titulo: title,
              descricao: desc,
              data: selectedDate
            })
          }
        >
          Salvar
        </button>

        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
