import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../data/users.json';
import Form from './Auth/Components/Form'; // Pastikan path-nya benar

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = usersData.users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin');
    } else {
      alert('Login gagal!');
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <Form 
        onSubmit={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <p className="text-sm text-center text-blue-600 mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </>
  );
}

export default Login;