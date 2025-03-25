// Pages/Layout/layouthAuth.jsx

const LayoutAuth = ({ children }) => {
    return (
      <div className="min-h-screen bg-indigo-100 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {children}
        </div>
      </div>
    );
  };
  
  export default LayoutAuth;
  