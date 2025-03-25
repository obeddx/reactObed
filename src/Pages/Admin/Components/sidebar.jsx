import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-blue-800 text-white h-full transition-all duration-300 w-20 lg:w-64 fixed">
      <div className="p-4">
        <a
          href="#"
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700"
        >
          <span className="text-lg">🏠</span>
          <span className="menu-text hidden lg:inline">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700"
        >
          <span className="text-lg">👩‍🎓</span>
          <span className="menu-text hidden lg:inline">Mahasiswa</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
