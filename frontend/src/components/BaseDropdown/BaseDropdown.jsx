/* eslint-disable react/prop-types */
import { useRef } from "react";

 const BaseDropdown = ({ isOpen, setIsOpen, children, className = "" }) => {
  const dropdownRef = useRef(null);

  return (
    isOpen && (
      <div
        className="fixed inset-0 flex justify-end"
        onClick={() => setIsOpen(false)}
        onBlur={()=> setIsOpen(false)}
      >
        <div
          ref={dropdownRef}
          className={`absolute right-5 top-16 bg-white border border-gray-200 rounded-lg shadow-lg w-80 ${className}`}
          onClick={(e) => e.stopPropagation()} // Ngăn chặn đóng khi click vào bên trong
        >
          {children}
        </div>
      </div>
    )
  );
}

export default BaseDropdown
