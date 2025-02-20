import { useState } from "react";
import Sidebar from "../components/AsideComponent/SidebarAdminComponent";
import HeaderAdmin from "../components/HeaderComponent/HeaderAdminComponent";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main content, thay đổi margin-left khi mở/đóng sidebar */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isMenuOpen ? "ml-64" : "ml-20"
        }`}
      >
        <HeaderAdmin />
        <main className="container mx-auto px-4 bg-white"><Outlet/></main>
      </div>
    </div>
  );
};

export default AdminLayout;
