# Product Management Service (Bài thực hành 3)

Dịch vụ NestJS quản lý sản phẩm, chạy độc lập tại `http://localhost:3001` và dùng database MySQL riêng `productdb`. Các API đều yêu cầu Bearer token do service xác thực của bài 2 cấp. Service chuyển token đến `GET /auth` của bài 2 để xác minh.

## Cấu hình và chạy

1. Tạo database và bảng từ `database/schema.sql` trong MySQL.
2. Cấu hình `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `AUTH_SERVICE_URL` và `PORT` trong `.env`. Đặt `DB_NAME=productdb` và `AUTH_SERVICE_URL=http://localhost:3000` nếu chạy theo cấu hình mặc định.
3. Khởi động service xác thực bài 2 ở cổng 3000, sau đó:

```sh
npm install
npm run start:dev
```

Lấy token bằng `POST http://localhost:3000/login` với `{ "userName": "...", "password": "..." }`, rồi gửi header `Authorization: Bearer <token>` đến API sản phẩm.

## API

| Phương thức | Đường dẫn | Mô tả |
|---|---|---|
| GET | `/products` | Danh sách sản phẩm |
| GET | `/products/:id` | Chi tiết sản phẩm |
| POST | `/products` | Tạo sản phẩm (`name`, `price`, tùy chọn `description`, `quantity`) |
| PUT | `/products/:id` | Cập nhật một phần thông tin sản phẩm |
| DELETE | `/products/:id` | Xóa sản phẩm (trả `204 No Content`) |

Ví dụ tạo sản phẩm:

```json
{
  "name": "Bàn phím",
  "description": "Bàn phím cơ",
  "price": 1250000.00,
  "quantity": 10
}
```

Giá phải không âm và có tối đa hai chữ số thập phân; số lượng phải là số nguyên không âm. ID không tồn tại trả `404`, dữ liệu không hợp lệ trả `400`, thiếu hoặc sai token trả `401`. Nếu service xác thực không khả dụng, API trả `503`.
