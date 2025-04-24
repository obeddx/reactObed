// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'




// import Form from "./Pages/Auth/Components/form";
import LayoutAdmin from "./Pages/Layouts/layoutAdmin";
import LayoutAuth from "./Pages/Layouts/layoutAuth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Pages/components/ProtectedRoute';

import Dashboard from './Pages/dashboard';
// import Mahasiswa from './Pages/mahasiswa';
import Mahasiswa from './Pages/Mahasiswa2';

import Login from "./Pages/login";
import MahasiswaDetail from "./Pages/MahasiswaDetail";

const App = () => {
  return (  <>
    <BrowserRouter>
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LayoutAuth />}>
          <Route index element={<Login/>} />
      </Route>
      {/* Admin Routes */}
      <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<MahasiswaDetail/>} />
        </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  );
};

export default App;
