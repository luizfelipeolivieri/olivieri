import Link from "next/link";
import { FaHome, FaCalendar, FaStore, FaBook, FaDollarSign, FaUsers } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-20 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col items-center pt-16 gap-6">
      <Link href="/dashboard"><FaHome /></Link>
      <Link href="/dashboard/calendar"><FaCalendar /></Link>
      <Link href="/dashboard/market"><FaStore /></Link>
      <Link href="/dashboard/classes"><FaBook /></Link>
      <Link href="/dashboard/finance"><FaDollarSign /></Link>
      <Link href="/dashboard/users"><FaUsers /></Link>
    </aside>
  );
}
