"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { supabase } from "@/services/supabaseClient";
import { getEvents, createEvent } from "@/services/calendarService";
import { generateCalendar } from "@/utils/calendarUtils";
import EventModal from "@/components/EventModal";

export default function Calendar() {
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [calendar, setCalendar] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      setUser(userData.user);

      const ev = await getEvents(userData.user.id);
      setEvents(ev);

      setCalendar(generateCalendar(year, month));
    }

    load();
  }, []);

  async function handleSave(event: any) {
    await createEvent({
      user_id: user.id,
      ...event
    });

    const updated = await getEvents(user.id);
    setEvents(updated);
    setSelectedDate(null);
  }

  function getEventsByDay(day: number) {
    return events.filter(e => {
      const d = new Date(e.data);
      return d.getDate() === day;
    });
  }

  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />

      <main className="ml-20 mt-16 p-6">
        <h1 className="text-2xl mb-6">Calendário</h1>

        <div className="grid grid-cols-7 gap-2">
          {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => (
            <div key={d} className="text-center font-bold">{d}</div>
          ))}

          {calendar.map((day, i) => (
            <div
              key={i}
              className="h-24 bg-slate-800 p-2 cursor-pointer"
              onClick={() =>
                day &&
                setSelectedDate(
                  `${year}-${month + 1}-${day}`
                )
              }
            >
              <div>{day}</div>

              {day &&
                getEventsByDay(day).map((e, idx) => (
                  <div key={idx} className="text-xs bg-blue-600 mt-1 p-1">
                    {e.titulo}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {selectedDate && (
          <EventModal
            selectedDate={selectedDate}
            onSave={handleSave}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </main>
    </ProtectedRoute>
  );
}
