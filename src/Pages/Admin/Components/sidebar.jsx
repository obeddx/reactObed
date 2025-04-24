import React from "react";
import { NavLink } from 'react-router-dom';
import Logout from "../../components/Logout";


const Sidebar = () => {
  return (
    <aside className="bg-blue-800 text-white h-full transition-all duration-300 w-20 lg:w-64 fixed">
      <div className="p-4">
        <NavLink 
          to="/admin/dashboard"
          className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
        >
          <span className="text-lg">🏠</span>
          <span className="menu-text hidden lg:inline">Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin/mahasiswa"
          className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? 'bg-blue-700' : ''}`}
        >
          <span className="text-lg">👩‍🎓</span>
          <span className="menu-text hidden lg:inline">Mahasiswa</span>
        </NavLink>
        <Logout className="flex items-center space-x-2 px-6 py-2 rounded hover:bg-blue-700" />
       
        

      </div>
    </aside>
  );
};

export default Sidebar;
