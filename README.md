# 🚴 Bicycle Market Strategy Simulator

Ứng dụng web mô phỏng và phân tích chiến lược marketing cho thị trường xe đạp với các tính năng phân tích ROI, NPV, Regression, PLS-SEM và nhiều KPI khác.

## ✨ Tính năng chính

- **Customer Segmentation**: Phân tích các phân khúc khách hàng (At-risk, Lost, Potential, VIP)
- **Product Strategy**: Quản lý chiến lược sản phẩm
- **Market Factors Analysis**: Phân tích các yếu tố vĩ mô và vi mô
- **Event Simulation**: Mô phỏng các sự kiện bất ngờ ảnh hưởng đến thị trường
- **Advanced Analytics**:
  - 📈 ROI Analysis
  - 💰 NPV & Cash Flow
  - 📊 Regression Models
  - 🧩 PLS-SEM Path Analysis
  - 💸 Profit Analysis
  - 🎯 KPI Dashboard

## 🛠️ Yêu cầu hệ thống

- **Node.js**: phiên bản 14.x trở lên
- **npm**: phiên bản 6.x trở lên (hoặc yarn)
- **Trình duyệt**: Chrome, Firefox, Safari, Edge (phiên bản mới nhất)

## 📦 Cài đặt

### Bước 1: Cài đặt dependencies

Mở terminal/command prompt trong thư mục dự án và chạy:

```bash
npm install
```

Hoặc nếu sử dụng yarn:

```bash
yarn install
```

### Bước 2: Kiểm tra cài đặt

Đảm bảo các package sau đã được cài đặt:
- react (^18.2.0)
- react-dom (^18.2.0)
- react-scripts (5.0.1)
- recharts (^2.8.0)
- plotly.js (^2.24.1)
- react-plotly.js (^2.6.0)
- papaparse (^5.4.1)

## 🚀 Chạy ứng dụng

### Chế độ Development

```bash
npm start
```

Ứng dụng sẽ tự động mở tại: **http://localhost:3000**

Nếu cổng 3000 đã được sử dụng, React sẽ tự động chọn cổng khác (3001, 3002, ...)

### Build cho Production

```bash
npm run build
```

File build sẽ được tạo trong thư mục `build/`

### Chạy Production Build

Sau khi build, bạn có thể chạy ứng dụng production bằng:

```bash
npm install -g serve
serve -s build
```

Hoặc sử dụng các công cụ khác như:
- **npx serve -s build**
- **python -m http.server** (trong thư mục build)

## 📖 Hướng dẫn sử dụng

### 1. Cấu hình Strategy

- **Customer Segments**: Chọn các phân khúc khách hàng (At-risk, Lost, Potential, VIP) và các micro-segments
- **Product Strategies**: Chọn các chiến lược sản phẩm
- **Market Factors**: Chọn các yếu tố vĩ mô và vi mô ảnh hưởng
- **Events**: Chọn các sự kiện bất ngờ để mô phỏng

### 2. Cấu hình Simulation

- **Total Budget**: Điều chỉnh ngân sách tổng (100K - 5M USD)
- **Simulation Months**: Chọn số tháng mô phỏng (3-24 tháng)

### 3. Chạy Simulation

Nhấn nút **"🚀 Run Simulation"** để bắt đầu phân tích.

### 4. Xem kết quả

Sau khi simulation hoàn tất, bạn có thể xem các tab:
- **ROI Analysis**: Phân tích ROI theo từng strategy
- **NPV & Cash Flow**: Giá trị hiện tại ròng và dòng tiền
- **Regression Models**: Mô hình hồi quy
- **PLS-SEM Analysis**: Phân tích PLS-SEM
- **Profit Analysis**: Phân tích lợi nhuận
- **Other KPIs**: Các chỉ số KPI khác

## 🏗️ Cấu trúc dự án

```
bicycle-simulator/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Charts/         # Các component chart
│   │   │   ├── ROITab.js
│   │   │   ├── NPVTab.js
│   │   │   ├── RegressionTab.js
│   │   │   ├── PLSTab.js
│   │   │   ├── ProfitTab.js
│   │   │   └── KPIsTab.js
│   │   ├── SimulationResults.js
│   │   ├── StrategySelector.js
│   │   └── UI/             # UI components
│   ├── data/
│   │   ├── factorsData.js   # Dữ liệu factors và events
│   │   └── eventsData.js
│   ├── styles/
│   │   ├── App.css         # Main styles
│   │   ├── charts.css      # Chart styles
│   │   └── components.css  # Component styles
│   ├── utils/
│   │   ├── simulationEngine.js  # Engine mô phỏng
│   │   ├── calculations.js      # Các hàm tính toán
│   │   └── formatters.js         # Format dữ liệu
│   ├── App.js              # Main component
│   └── index.js            # Entry point
├── data/                   # CSV data files
├── package.json
└── README.md
```

## 🔧 Troubleshooting

### Lỗi: "Module not found"
```bash
# Xóa node_modules và cài đặt lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Port already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Lỗi: "Cannot find module 'react-scripts'"
```bash
npm install react-scripts --save
```

## 📝 Scripts có sẵn

- `npm start`: Chạy ứng dụng ở chế độ development
- `npm run build`: Build ứng dụng cho production
- `npm test`: Chạy test suite
- `npm run eject`: Eject khỏi Create React App (không thể hoàn tác!)

## 🎯 Tính năng đã được tối ưu

✅ **Error Handling**: Đã thêm xử lý lỗi và validation
✅ **Null Safety**: Kiểm tra null/undefined cho tất cả dữ liệu
✅ **Performance**: Tối ưu render với useMemo và proper state management
✅ **User Experience**: Thông báo lỗi rõ ràng và loading states
✅ **Code Quality**: Không có linter errors, code được format chuẩn

## 📄 License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.

## 👨‍💻 Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Đã cài đặt đầy đủ dependencies chưa
2. Node.js version có đúng không
3. Console log để xem lỗi chi tiết

---

**Chúc bạn sử dụng ứng dụng hiệu quả! 🚀**

