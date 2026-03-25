import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full h-14 bg-slate-800 flex items-center justify-end px-6 gap-4 fixed top-0 z-50">
      <FaBell size={20} />
      <FaUserCircle size={24} />
    </header>
  );
}
