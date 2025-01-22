import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {


  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      <div className="container relative sticky top-0 flex justify-between px-4 py-4 mx-auto lg:flex md:flex md:justify-around lg:items-center lg:justify-between">
     
        <Link to="/">
          <div className="text-3xl font-Dosis font-bold text-orange-500">HocPython</div>
        </Link>
        <div className="flex items-center px-4 search rounded-full border border-gray-600 w-[420px] ">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-lg text-gray-500"
            />
            <input
              type="text"
              className="pl-6 pr-4 py-2 focus:outline-none flex-grow text-sm"
              placeholder="Tìm kiếm khóa học, bài viết, video.... "
            />
           
          </div>

        <ul className="flex items-center ">
          <li>
            <button className="px-4 py-2 text-sm text-black hover:text-blue-500 font-semibold">
              Đăng ký
            </button>
          </li>
          <li>
            <button className="px-4 py-2 text-white ml-2 text-sm font-medium bg-orange-500 rounded-full ">
              Đăng nhập
            </button>
          </li>
        </ul>

        <ul className="items-center flex md:hidden lg:hidden" >
          <li>
            <button className="px-4 py-2 text-gray-500 hover:text-blue-500">
              Khóa học của tôi
            </button>
          </li>
          <li>
            <button className="px-4 py-2 text-gray-500 hover:text-blue-500">
            <FontAwesomeIcon icon={faBell} />
            </button>
          </li>
          <li className="relative">
            <Link
              to="/user"
              className="relative group after:w-full after:h-[30px] after:absolute after:top-[20px] after:left-0 after:bg-transparent"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="px-2 text-lg text-gray-500 "
              />
              <div className="absolute w shadow-xl rounded top-[40px] right-[-20px] hidden w-44">
                <ul className="flex flex-col items-center justify-center bg-white">
                  <li>
                    <Link
                      to="/user"
                      className="block px-4 py-2 hover:text-blue-500"
                    >
                      Tài Khoản
                    </Link>
                  </li>
                  <li>
                    <Link className="block px-4 py-2 hover:text-blue-500">
                      Đơn Mua
                    </Link>
                  </li>
               
                  <li>
                    <Link to="/sign-in"  className="block px-4 py-2 hover:text-blue-500">
                      Đăng Nhập
                    </Link>
                  </li>
                  <li>
                    <Link className="block px-4 py-2 hover:text-blue-500">
                      Đăng Xuất
                    </Link>
                  </li>
                </ul>
              </div>
            </Link>
          </li>
         
        </ul>
      </div>
    </header>
  );
};

export default Header;
