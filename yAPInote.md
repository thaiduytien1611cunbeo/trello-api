### Quy trình làm con trello

# 1. Clone source base tại https://youtu.be/8hhXamKIdsY

# 2. Connection với MongoDB

# 3. Viết file biến môi trường env

    -> file environment sẽ lấy toàn bộ biến môi trường rồi export ra nếu cần dùng thì sẽ lấy từ file environment

# 4. Viết các route

# 5. Xử lý validation

# 6. Xử lý lỗi tập trung

# 7. Xử lý Môi trường Dev & Production trong dự án

    -> Dùng cross-env để thêm vào Biến môi trường BUILD_MODE (window sẽ bị lỗi)
    -> Trong file package.json thêm vào (cross-env BUILD_MODE=dev) để coi như là trước khi chạy nodemon thì chạy gán biến môi trường BUILD_MODE trong file env gán nó bằng dev (mặc định cũng sẽ đặt là dev). Còn khi chạy (npm run build) thì gán BUILD_MODE=production

# 8. Viết Service để xử lý các logic nghiệp vụ

# 9. Viết Model để kết nối với Database

# 10. Viết các API xử lý CRUD
