import Sidebar from "../Admin/Components/sidebar";


const LayoutAdmin = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Sidebar/>
        <div class="flex-1 ml-20 lg:ml-64">
          {children}
        </div>
        
      </div>
    );
  };
  
  export default LayoutAdmin;