
# Website Dạy học Lập trình web với Python

## Giới thiệu

Dự án này là một nền tảng website dạy học lập trình web bằng Python, được thiết kế để cung cấp một bộ tài liệu học tập có tính tương tác cao. Hệ thống giúp người học nắm vững kiến thức lập trình Python cơ bản, phát triển kỹ năng tự học và khám phá các ứng dụng thực tiễn của Python trong lập trình web.

Mục tiêu chính là tạo ra một môi trường học tập trực quan và hấp dẫn, vượt trội so với các phương pháp truyền thống bằng cách tích hợp các công nghệ tương tác tiên tiến.

## Các chức năng chính

Hệ thống cung cấp các chức năng toàn diện cho cả người học và quản trị viên:

### Chức năng dành cho Người học:

* **Đăng ký & Đăng nhập:** Tạo tài khoản và truy cập hệ thống.
* **Duyệt và xem khóa học:** Tìm kiếm, xem danh sách và chi tiết các khóa học, bài học.
* **Học tập tương tác:** Tham gia các bài học video có tính tương tác, làm bài tập và nhận phản hồi trực tiếp.
* **Thực hành lập trình:** Sử dụng trình soạn thảo mã nguồn tích hợp để viết và chạy code Python ngay trên trình duyệt.
* **Kiểm tra kiến thức:** Làm các bài Quiz/kiểm tra để tự đánh giá.
* **Theo dõi & xem kết quả:** Xem tiến độ học tập và kết quả các bài kiểm tra.
* **Quản lý hồ sơ:** Cập nhật thông tin cá nhân.
* **Tải chứng chỉ:** Tải xuống chứng chỉ sau khi hoàn thành khóa học và đạt yêu cầu.

### Chức năng dành cho Quản trị viên:

* **Quản lý người dùng:** Thêm, sửa, xóa, xem thông tin người dùng.
* **Quản lý khóa học & bài học:** Tạo, sửa, xóa các khóa học và cấu trúc bài học.
* **Quản lý nội dung học liệu:** Tải lên, sửa đổi, xóa các tài nguyên học tập (video, quiz, code snippets).
* **Quản lý ngân hàng câu hỏi:** Thêm, sửa, xóa, tìm kiếm câu hỏi cho các bài kiểm tra.
* **Xem báo cáo & thống kê:** Theo dõi tiến độ học tập của người học và các chỉ số hệ thống.
* **Quản lý & cấp chứng chỉ:** Cấp chứng chỉ cho người học và quản lý các chứng chỉ đã phát hành.

## Công nghệ sử dụng

Dự án được xây dựng trên stack công nghệ hiện đại để đảm bảo hiệu suất, khả năng mở rộng và dễ dàng bảo trì:

* **Backend:** `Node.js` với framework `Express.js`
* **Frontend:** `React.js` (Thư viện UI) kết hợp với `Tailwind CSS` (Framework CSS)
* **Cơ sở dữ liệu:** `MongoDB` (NoSQL Database)
* **Công cụ hỗ trợ:**
    * Markdown editor
    * Code editor tích hợp
    * Video embed
    * Text-to-Speech (TTS)
    * **H5P:** Framework mã nguồn mở để tạo nội dung tương tác (video tương tác, bài thuyết trình, v.v.).

## Tích hợp H5P Interactive Video

Hệ thống của chúng tôi tích hợp mạnh mẽ chức năng tạo và hiển thị nội dung video tương tác thông qua **H5P**.

* **Khả năng tương thích:** Mặc dù H5P phổ biến trên các hệ thống PHP và LMS như Canvas, Moodle, WordPress, chúng tôi đã thành công trong việc tích hợp nó vào môi trường JavaScript (Node.js/React).
* **Nền tảng hỗ trợ tạo nội dung:** Chúng tôi sử dụng [Lumi Education](https://lumi.education/vi/) làm công cụ chính để tạo ra các loại nội dung H5P đa dạng và phong phú.

## Hướng dẫn sử dụng (Dành cho Quản trị viên - Tạo & Triển khai nội dung H5P)

Để tạo và tích hợp nội dung video tương tác H5P vào website của chúng tôi, Quản trị viên thực hiện các bước sau:

1.  **Truy cập và Đăng nhập Lumi Education:**
    * Mở trình duyệt và truy cập: [https://lumi.education/vi/](https://lumi.education/vi/)
    * Đăng nhập vào tài khoản của bạn (có thể sử dụng tài khoản mạng xã hội hoặc đăng ký mới nếu cần).
    * ![Lumi Education Dashboard](image_1222c0.png)

2.  **Tạo nội dung mới:**
    * Trên giao diện Lumi Education, điều hướng đến tab `Content`.
    * Chọn `Add content` -> `Create new content`.
    * Chọn loại nội dung H5P bạn muốn tạo, ví dụ như `Interactive Video` (video tương tác) hoặc `Course Presentation` (bài thuyết trình khóa học).

3.  **Thiết kế và lưu nội dung:**
    * Sử dụng công cụ soạn thảo của Lumi Education để thiết kế và xây dựng nội dung tương tác của bạn.
    * Sau khi hoàn tất, hãy đảm bảo lưu lại nội dung.

4.  **Triển khai nội dung (Deploy):**
    * Chuyển sang tab `Deployments`.
    * Chọn nội dung H5P mà bạn vừa tạo và đã lưu.
    * Nhấp vào nút `Deploy`.
    * Sau khi quá trình triển khai hoàn tất, bạn sẽ được cung cấp các tùy chọn để tích hợp nội dung vào website của chúng tôi:
        * **Link:** Sử dụng đường dẫn URL trực tiếp của nội dung.
        * **Embed code:** Lấy mã nhúng HTML để chèn nội dung vào các trang bài học tương ứng trên website.
        * (Tùy chọn) Mã QR cũng có thể được tạo để truy cập nhanh nội dung.
    * ![Lumi Education Deployment Options](image-1.png)

## Phát triển và Đóng góp

Dự án này đang trong giai đoạn phát triển tích cực. Chúng tôi hoan nghênh mọi sự đóng góp từ cộng đồng để cải thiện và mở rộng các tính năng của hệ thống.

* Để tìm hiểu sâu hơn về cách tạo nội dung H5P tùy chỉnh cho môi trường Node.js, bạn có thể tham khảo tài liệu chính thức của Lumi Education tại: [H5P-Nodejs-Library](https://docs.lumi.education)

---
**Thông tin dự án:**
* **Đăk Lăk, Tháng 05 năm 2025**