import axios from "axios";

const enrollCourse = async (courseId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/enroll/enroll`, 
            {courseId} , 
            { withCredentials: true } 
        );
     
         return res.data;
    
        
    } catch (error) {
        console.log(error.response?.data?.message || "Có lỗi xảy ra!");
    }
};
const allCourseEnroll = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/enroll/my-courses`,{withCredentials: true})
        return res.data
    }
    catch (error) {
        console.log(error?.response?.data?.message)
    }
}

export default {
    enrollCourse,
    allCourseEnroll,
}