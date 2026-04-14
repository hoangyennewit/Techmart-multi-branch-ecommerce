import { Routes, Route } from 'react-router-dom';

// Chỉ gọi duy nhất trang Kho ra thôi
import { ManagerInventoryPage } from './features/Manager/ManagerInventoryPage';

function App() {
  return (
    <Routes>
      {/* Ép đường dẫn mặc định (/) chạy thẳng vào trang Kho */}
      <Route path="/" element={<ManagerInventoryPage />} />
      
      {/* Nếu gõ sai link nào khác thì cũng văng về trang Kho luôn */}
      <Route path="*" element={<ManagerInventoryPage />} />
    </Routes>
  );
}

export default App;