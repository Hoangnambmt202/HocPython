import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {Link} from 'react-router-dom'
import { BookCheck, BookMarked, Dot, Mail, Phone, SquarePen, User } from "lucide-react";
const ProfilePage = () => {
  const courses = [
    {
      id: 1,
      title: "Python cơ bản",
      type: "Đang học",
      img: "https://itech.edu.vn/wp-content/uploads/2022/08/pasted-image-0.png",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
    },
    {
      id: 2,
      title: "Machine Learning",
      type: "Đang học",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 30,
      totalLessons: 32,
      completedLessons: 10,
    },
    {
      id: 3,
      title: "Data Science",
      type: "Hoàn thành",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 100,
      totalLessons: 28,
      completedLessons: 28,
    },
    {
      id: 4,
      title: "Web Development",
      type: "Gần đây",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 15,
      totalLessons: 40,
      completedLessons: 6,
    },
    {
      id: 4,
      title: "Web Development",
      type: "Gần đây",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 15,
      totalLessons: 40,
      completedLessons: 6,
    },
    {
      id: 4,
      title: "Web Development",
      type: "Gần đây",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 15,
      totalLessons: 40,
      completedLessons: 6,
    },
    {
      id: 4,
      title: "Web Development",
      type: "Gần đây",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 15,
      totalLessons: 40,
      completedLessons: 6,
    },
    {
      id: 4,
      title: "Web Development",
      type: "Gần đây",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      progress: 15,
      totalLessons: 40,
      completedLessons: 6,
    },
  ];

  const savedArticles = [
    { id: 1, title: "Article 1", description: "Description of article 1" },
    { id: 2, title: "Article 2", description: "Description of article 2" },
    // Add more articles as needed
  ];
  const [user, setUser] = useState(null); // 👈 Khởi tạo null
  const [loading, setLoading] = useState(true); // 👈 Thêm trạng thái loading
  const [active, setActive] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Lỗi parse user:", error);
        Cookies.remove("user");
      } finally {
        // 👈 Luôn tắt loading
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading user data...</div>;
  }

  if (!user) {
    return <div className="text-center py-8 text-red-500">User not found</div>;
  }
  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex flex-col py-10 md:flex-row">
        <div className="md:w-1/4 container mx-auto px-4 mb-4 md:mb-0">
       
          <img
            src={user.avatar}
            alt={`User Avatar ${user?.name || "Guess"}`}
            className="w-32 h-32 rounded-full object-fill mx-auto "
          />
          <div className="flex items-center justify-center ">
            <h3 className="text-xl font-semibold text-center mr-2 ">{user?.name || "Guess"}</h3>
            <button ><SquarePen width="1rem" height="1rem" /></button>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2"><Mail/></span>
            <span>{user?.email || "Chưa cập nhật email"}</span> 
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2">
              <Phone/>
            </span>
            <span className="mr-2">
              {user?.phone || "Chưa cập nhật số điện thoại"}
            </span>
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2"><User/></span><span className="mr-2">{user?.role || "Chưa cập nhật role"}</span>
            
          </div>
          <div className="text-gray-600 flex justify-start items-center mb-2">
            <span className="mr-2"><Dot className={active ? "text-green-500" : "text-red-500" }/></span><span>{user?.isActive ? "Đang hoạt động" : "Đã khóa"}</span>
            
          </div>

        </div>
        <div className="md:w-3/4 px-4 container mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center"> <span className="mr-2"><BookCheck/></span> Khóa học của tôi</h3>
              <p>Bạn đã hoàn thành 3/8 khóa học.</p>
            </div>
            <div>
              <select className="w-fit border p-2 rounded-md">
                <option value="latest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="free">Miễn phí</option>
              </select>
            </div>
          </header>
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {courses.map((course, index) => (
                <Link to={`/course`} key={index} className="card bg-gray-100 rounded-lg shadow-md">
                  <img src={course.img} alt={`Course ${index + 1}`} className="w-full h-32 object-cover rounded-t-lg" />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    
                  </div>
                  <div className="flex justify-between items-center p-2 border-t">
                  <div className="w-full">
                        <div className="text-gray-500 text-base">Học cách đây 2 tháng trước</div>
                    {/* Progress bar */}
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          {course.completedLessons}/{course.totalLessons} bài học
                        </span>
                        <span className="text-xs font-medium text-orange-500">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
             
            ))}
            </div>
          <h4 className="text-2xl flex font-bold items-center mt-6 mb-3"> <span className="mr-2"><BookMarked/></span>Saved Articles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
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
