import axios from 'axios';

const saveProgress = async (courseId, lessonId, completed) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/progress/save`, {
      courseId,
      lessonId,
      completed
    }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getProgress = async (slug) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/progress/${slug}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getLastLesson = async (slug) => {
  try {
    
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/progress/${slug}/last-lesson`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const updateLastLesson = async (slug, lessonId, chapterId) => {
  try {
   
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/progress/${slug}/last-lesson`, {
      lessonId,
      chapterId
    }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  saveProgress,
  getProgress,
  getLastLesson,
  updateLastLesson
}; 