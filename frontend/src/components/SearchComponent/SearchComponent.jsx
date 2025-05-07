import { LoaderCircle, SearchIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseService from "../../services/CourseService";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.trim()) {
        handleSearchCourses(searchValue);
      } else {
        setSearchResults([]);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearchCourses = async (keyword) => {
    try {
      setIsLoading(true);
      const response = await CourseService.searchCourses(keyword);
      setIsLoading(true);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="relative flex mt-2 w-full z-50">
        <div className="flex flex-col w-full">
          <div className="flex items-center border md:min-w-80 lg:min-w-80 border-gray-400 rounded-full px-4 py-2 bg-white">
            <button className="flex items-center justify-center">
              <SearchIcon
                
                className="text-gray-500"
                width="1.25rem"
                height="1.25rem"
              />
            </button>

            <input
              type="text"
              ref={inputRef}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowResults(true);
              }}
              onBlur={() => setShowResults(false)}
              onFocus={() => setShowResults(true)}
              className="ml-2 w-full text-sm focus:outline-none"
              placeholder="Tìm kiếm khóa học..."
            />
            {searchValue && !isLoading && (
              <button
                className="absolute right-4"
                onClick={() => {
                  setSearchValue("");
                  inputRef.current.focus();
                  setShowResults(false);
                }}
              >
                <X size={16} />
              </button>
            )}

            {isLoading && (
              <div className="absolute right-4">
                <LoaderCircle
                  className="animate-spin"
                  width="1.25rem"
                  height="1.25rem"
                />
              </div>
            )}
          </div>

          {searchResults.length > 0 && (
            <ul className="absolute  h-400px max-h-[400px] top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 overflow-y-auto ">
              <h3 className=" p-2 text-base bold">Khoá học</h3>
              {searchResults.map((course) => (
                <>
                  <li className="p-2 hover:bg-gray-100">
                    <Link
                      to={`/course/${course.slug}`}
                      onClick={() => setSearchResults([])}
                      className="flex items-center gap-2"
                    >
                      <img
                        src={course.thumbnail}
                        className="rounded-full w-6 h-6"
                        alt={course.title}
                      />
                      <div className="text-sm font-medium text-gray-800">
                        {course.title}
                      </div>
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
