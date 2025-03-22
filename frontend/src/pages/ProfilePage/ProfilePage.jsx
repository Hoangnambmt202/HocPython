import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
// import avatar from '../../assets/imgs/pexels-ryan-holloway-71499-242829.jpg'


const ProfilePage = () => {


    const courses = [
        { id: 1, title: 'Course 1', description: 'Description of course 1' },
        { id: 2, title: 'Course 2', description: 'Description of course 2' },
        // Add more courses as needed
    ];

    const savedArticles = [
        { id: 1, title: 'Article 1', description: 'Description of article 1' },
        { id: 2, title: 'Article 2', description: 'Description of article 2' },
        // Add more articles as needed
    ];
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            console.log(setUser)
          } catch (error) {
            console.error("Lỗi khi phân tích JSON:", error);
            Cookies.remove("user");
          }
        }
      }, []);
      

    return (
        <div className="container mx-auto p-4 bg-white">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 text-center mb-4 md:mb-0">
                    <img src='' alt="User Avatar" className="w-32 h-32 rounded-full object-fill mx-auto mb-3" />
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="md:w-3/4">
                    <h4 className="text-lg font-semibold mb-3">Courses</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map(course => (
                            <div key={course.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h5 className="text-md font-semibold">{course.title}</h5>
                                <p className="text-gray-600">{course.description}</p>
                            </div>
                        ))}
                    </div>
                    <h4 className="text-lg font-semibold mt-6 mb-3">Saved Articles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedArticles.map(article => (
                            <div key={article.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h5 className="text-md font-semibold">{article.title}</h5>
                                <p className="text-gray-600">{article.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;