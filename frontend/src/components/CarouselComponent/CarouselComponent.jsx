import  { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {Link} from "react-router-dom";

const CarouselComponent = ({button}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Học Python cơ bản miễn phí",
      description: "Khóa học Python cơ bản miễn phí. Kết quả của khóa học này là bạn có thể viết được các chương trình Python cơ bản.",
      image:
        "https://itech.edu.vn/wp-content/uploads/2022/08/pasted-image-0.png",
    },
    {
      title: "Nâng cao với framework Django",
      description: "Khóa học Django từ cơ bản đến nâng cao. Kết quả của khóa học này là bạn có thể làm hầu hết các dự án với Django.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
    },
    {
      title: "Giải thuật cho Python",
      description: "Khóa học giải thuật cho Python. Kết quả của khóa học này là bạn có thể giải được các bài toán giải thuật cơ bản.",
      image:
        "https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/Python_-_Algorithms_6865856c821b4bbe88a9b9e88dba2208.png",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full mx-auto max-h-96 mb-8">
      {/* Main carousel container */}
      <div className="relative h-full overflow-hidden rounded-lg">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center flex-shrink-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 p-8 text-center text-white">
                <h2 className="mb-4 text-3xl font-bold">{slide.title}</h2>
                <p className="mb-4 text-lg">{slide.description}</p>
                <Link to="/collection" >
                <button className="px-8 py-3 text-black transition duration-300 bg-white hover:bg-black hover:text-white">
                  {button}
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute p-2 transition-all -translate-y-1/2 bg-white rounded-full left-4 top-1/2 bg-opacity-30 hover:bg-opacity-50"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute p-2 transition-all -translate-y-1/2 bg-white rounded-full right-4 top-1/2 bg-opacity-30 hover:bg-opacity-50"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-4"
                  : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
