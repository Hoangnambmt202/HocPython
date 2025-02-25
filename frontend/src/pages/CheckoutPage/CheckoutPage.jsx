import { SquareCode, Watch } from "lucide-react";

const CheckoutPage = () => {
    const course = {
        title: "Lập trình Python cơ bản",
        description: "Khóa học cung cấp trọn bộ kiến thức cơ bản của lập trình Python, học viên có thể tạo ra một ứng dụng hoàn chỉnh với Python sau khi hoàn thành khóa học.",
        introduction: [
            "Khóa học cung cấp trọn bộ kiến thức cơ bản của lập trình Python, học viên có thể tạo ra một ứng dụng hoàn chỉnh với Python sau khi hoàn thành khóa học.",
            "Tìm hiểu cơ bản về ngôn ngữ lập trình Python (Từ định nghĩa đến các nội dung quan trọng như kiểu dữ liệu, biến, chuỗi, cấu trúc điều khiển, cấu trúc vòng lặp, hàm trong Python,...)",
            "Giúp các bạn nhỏ phát huy trí tưởng tượng mới mẻ, sáng tạo trong quá trình vừa học vừa thực hành.",
            "Rèn luyện khả năng kiên trì, nhẫn nại và kĩ năng giải quyết vấn đề cho học viên."
        ],
        instructor: { name: "Nguyễn Văn A" },
        price: 499000,
        thumbnail: "src/assets/imgs/pexels-hikaique-307847.jpg",
        category: "Lập trình",
        isPublished: true,
        content: [
          { title: "Giới thiệu", lessons: [{ title: "Bài 1: React là gì?", duration: 10 }] },
          { title: "Cơ bản", lessons: [{ title: "Bài 2: JSX và Component", duration: 15 }] },
        ],
        numberStudent: 150,
        reviews: [{ user: { name: "Trần B" }, rating: 5, comment: "Khóa học rất hay!" }],
        comments: [{ user: { name: "Lê C" }, content: "Bài giảng dễ hiểu!" }],
        certificate: "/src/assets/imgs/certificate-default.jpg",
      };


  return (
    <div className="container flex mx-auto bg-gray-50 p-4 gap-4 " >
        <div className="basis-8/12 bg-gray-50" >
            <div className=" w-full bg-white shadow-xl rounded-md flex">
                <div className="basis-3/12">
                <img src="/src/assets/imgs/default-thumbnail.jpg" className="w-full h-full" alt="" />
                </div>
                <div className="flex-1 p-4">
                    <h3 className="mb-2 text-lg font-thin">{course.title}</h3>
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-1 text-xs" >
                            ⭐⭐⭐⭐⭐ <span>4.9</span>
                        </div>
                        <div className="text-xs flex items-center gap-1">
                            <Watch size={16}/>
                            <span>29 giờ học</span>
                        </div>
                        <div className="text-xs flex items-center gap-1">
                            <SquareCode size={16}/>
                            <span>132 bài học</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        
                        <span className="font-medium text-lg">
                        {course.price} đ
                        </span>
                        <span className="line-through">
                        550000 đ
                        </span>
                        
                    </div>

                </div>

            </div>
        </div>
        <div className="basis-4/12 bg-white border-2 shadow-xl p-4">
            <div className="mb-3">
                <h2 className="text-lg font-semibold mb-3">Phương thức thanh toán</h2>
                <select className="px-3 py-2 outline outline-1 mb-2 outline-gray-400 rounded-lg w-full" name="" id="">
                    <option value="">VietQR</option>
                    <option value="">Thẻ nội địa</option>
                    <option value="">Thẻ Visa</option>
                    <option value="">Mobile Banking</option>
                </select>
            </div>
            <div className="mb-2"> 
                <h2 className="text-lg font-semibold mb-2">Tổng tiền</h2>
                <div className="flex mb-2">
                    <input type="text" placeholder="Nhập mã giảm giá" className="px-3 flex-1 border border-solid border-gray-400 border-r-transparent outline-none py-2 text-sm" /> 
                    <button className="text-blue-500 text-sm border border-solid border-gray-400 border-l-transparent py-2 px-2">Áp dụng</button>

                </div>
                <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-base" >Tổng tiền</span>
                        <span className="text-black">499.000đ</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-base" >Khuyến mãi</span>
                        <span className="text-black">0đ</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-black" >Tổng thanh toán</span>
                    <span className="text-blue-500 text-xl">499.000đ</span>
                </div>
            </div>
            <div>
                <button className="w-full rounded-xl bg-gray-400 text-white px-3 py-2">Thanh toán</button>
            </div>
            
        
        </div>

    </div>
  )
}

export default CheckoutPage