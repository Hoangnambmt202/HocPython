import axios from "axios";

const getUserNotifications = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/user`, {
    withCredentials: true
  });
  return res.data;
};

const getAllNotifications = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/all`, {
    withCredentials: true
  });
  return res.data;
};

const createNotification = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/notifications`, data, {
    withCredentials: true
  });
  return res.data;
};

const markAsRead = async (notificationId) => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/notifications/${notificationId}/read`, {}, {
    withCredentials: true
  });
  return res.data;
};

const markAllAsRead = async () => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/notifications/read-all`, {}, {
    withCredentials: true
  });
  return res.data;
};
const updateNotification = async (notificationId, data) => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/notifications/update/${notificationId}`, data, {
    withCredentials: true
  });
  console.log("data từ frontend:",data)
  return res.data;
};
const deleteNotification = async (notificationId) => {
  const res = await axios.delete(`${import.meta.env.VITE_API_URL}/notifications/${notificationId}`, {
    withCredentials: true
  });
  return res.data;
};

const getUnreadCount = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/unread/count`, {
    withCredentials: true
  });
  return res.data;
};

export default {
  getUserNotifications,
  getAllNotifications,
  createNotification,
  updateNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
}; 