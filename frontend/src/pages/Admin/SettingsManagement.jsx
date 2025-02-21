import { useState } from "react";
import { Switch } from "@headlessui/react";

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    siteName: "Học Lập Trình Python",
    adminEmail: "admin@example.com",
    theme: "light",
    maintenanceMode: false,
    enableNotifications: true,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Cài đặt đã được lưu thành công!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Cài Đặt Hệ Thống</h1>
      <div className="space-y-6">
        <div>
          <label className="block font-medium">Tên Website</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Email Quản Trị</label>
          <input
            type="email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block font-medium">Chủ Đề</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Mật Khẩu Mới</label>
          <input
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Bật thông báo Email</span>
          <Switch
            checked={settings.enableNotifications}
            onChange={() => handleToggle("enableNotifications")}
            className={`${
              settings.enableNotifications ? "bg-blue-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                settings.enableNotifications ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Chế độ bảo trì</span>
          <Switch
            checked={settings.maintenanceMode}
            onChange={() => handleToggle("maintenanceMode")}
            className={`${
              settings.maintenanceMode ? "bg-red-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        >
          Lưu Cài Đặt
        </button>
      </div>
    </div>
  );
}

export default SettingsManagement