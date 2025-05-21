/* eslint-disable react/prop-types */
import { LoaderCircle, SearchIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchComponent = ({
  placeholder = "Tìm kiếm...",
  searchFunction,
  resultKey = "title",
  resultImageKey = "thumbnail",
  resultLinkPrefix = "",
  renderItem = null,
  debounceTime = 500,
  minWidth = "md:min-w-80 lg:min-w-80",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue.trim()) {
        handleSearch(searchValue);
      } else {
        setSearchResults([]);
      }
    }, debounceTime);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearch = async (keyword) => {
    try {
      setIsLoading(true);
      const response = await searchFunction(keyword);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchResults([]);
    setShowResults(false);
    inputRef.current.focus();
  };

  return (
    <div className="relative flex mt-2 w-full z-50">
      <div className="flex flex-col ">
        <div
          className={`flex items-center border border-gray-400 rounded-full px-4 py-2 bg-white ${minWidth}`}
        >
          <button className="flex items-center justify-center">
            <SearchIcon className="text-gray-500" width="1.25rem" height="1.25rem" />
          </button>

          <input
            type="text"
            ref={inputRef}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowResults(true);
            }}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            onFocus={() => setShowResults(true)}
            className="ml-2 text-sm focus:outline-none"
            placeholder={placeholder}
          />

          {searchValue && !isLoading && (
            <button className="absolute right-4" onClick={handleClear}>
              <X size={16} />
            </button>
          )}

          {isLoading && (
            <div className="absolute right-4">
              <LoaderCircle className="animate-spin" width="1.25rem" height="1.25rem" />
            </div>
          )}
        </div>

        {showResults && searchResults.length > 0 && (
          <ul className="absolute max-h-[400px] top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 overflow-y-auto">
            {searchResults.map((item, index) => (
              <li key={index} className="p-2 hover:bg-gray-100">
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <Link
                    to={`${resultLinkPrefix}${item.slug || item._id}`}
                    onClick={() => setSearchResults([])}
                    className="flex items-center gap-2"
                  >
                    {resultImageKey && item[resultImageKey] && (
                      <img
                        src={item[resultImageKey]}
                        className="rounded-full w-6 h-6"
                        alt={item[resultKey]}
                      />
                    )}
                    <div className="text-sm font-medium text-gray-800">
                      {item[resultKey]}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;