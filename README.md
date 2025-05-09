📌 Tính năng chính: 
- Quản lý dạy học
- Học Tập 
- Tích hợp interactive video để tạo bài giảng sinh động, hấp dẫn, thu hút học viên
-  

📌Hướng dẫn sử dụng:
 - Truy cập https://lumi.education/vi/ -> đăng nhập tài khoản (đăng nhập tài khoản MXH ,nếu chưa thì đăng ký rồi đăng nhập)
 - Đăng nhập thành công sẽ ở trang có URL : https://app.lumi.education/dashboard
 - Content -> Add content -> create new content - > chọn loại mình muốn làm như video interactive, course presentation ,...

![alt text](image.png)
 - tạo và lưu content 
 - Qua tab Deployments chọn content vừa tạo -> deploy -> chọn content vừa deploy -> có 2 option : link hoặc code embed, QR code (tùy chọn)

![alt text](image-1.png)
📌 Hệ thống tích hợp H5P interactive video (hoạt động hỗ trợ tốt trên các hệ thống PHP, LMS như Canvas, Blackboard , Moodle, Wordpress, ...), chỉ có 1 vài project sử dụng với JavaScript

📌 Cách thức hoạt động của hệ thống
Hệ thống quản lý khóa học sẽ hoạt động dựa trên mô hình dữ liệu:

Khóa học (Course): Chứa nhiều chương học (Chapter).
Chương học (Chapter): Chứa nhiều bài giảng (Lesson).
Bài giảng (Lesson): Chứa video, giáo trình (Markdown) và bài tập trắc nghiệm (Quiz).
Bài tập trắc nghiệm (Quiz): Mỗi bài học có thể có nhiều câu hỏi với 4 lựa chọn, học viên làm bài và chọn câu trả lời đúng.
Tiến độ học tập (Progress): Lưu bài học đã hoàn thành và % tiến độ của học viên trong khóa học.
Đăng ký học (Enrollment): Lưu thông tin học viên đã mua khóa học.


📌 4. Tổng kết

✔ Tạo khóa học gồm nhiều chương và bài học.

✔ Hỗ trợ Markdown Editor cho giáo trình lý thuyết.

✔ Hỗ trợ tạo bài tập quiz cho mỗi bài học.

✔ Tự động cập nhật tiến độ học viên khi hoàn thành bài học.