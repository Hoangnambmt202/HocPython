import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ButtonOnTop = () => {
  const [visible, setVisible] = useState(false);

  // Hiện nút khi scroll xuống 300px
  const toggleVisible = () => {
    const scrolled = window.scrollY;
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 transition-all z-50 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ButtonOnTop;
