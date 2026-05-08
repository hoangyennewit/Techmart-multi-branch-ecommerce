import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ClientRoutes } from './routes/ClientRoutes';
import { ActorRoutes } from './routes/ActorRoutes';

function App() {
  return (
    <>
      <Routes>
        {/* Vừa vào localhost:5173 là tự động đẩy sang trang Chọn Quyền */}
        <Route path="/" element={<Navigate to="/portal" replace />} />
      </Routes>

      <ActorRoutes />
      <ClientRoutes />
    </>
  );
}

export default App;