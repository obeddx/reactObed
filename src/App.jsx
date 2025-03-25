// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'



import Footer from "./Pages/Admin/Components/footer";
import Header from "./Pages/Admin/Components/header";
import Konten from "./Pages/Admin/Components/konten";
import Form from "./Pages/Auth/Components/form";
import LayoutAdmin from "./Pages/Layouts/layoutAdmin";
import LayoutAuth from "./Pages/Layouts/layoutAuth";

const App = () => {
  return (
    <>
    {/* <LayoutAuth>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <Form type="" onsubmit="handleLogin(event)" />
      <p className="text-sm text-center text-blue-600 mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </LayoutAuth> */}
    <LayoutAdmin>
        <Header/>
        <Konten/>
        <Footer/>
    </LayoutAdmin>
    </>
  );
};

export default App;
