import React from 'react';
import { ClientRoutes } from './routes/ClientRoutes';
import { ActorRoutes } from './routes/ActorRoutes';

function App() {
  return (
    <>
      {/* 1. Hệ thống dành cho Khách hàng (Người dùng) */}
      <ClientRoutes />

      {/* 2. Hệ thống dành cho Quản lý nội bộ (Actors) */}
      <ActorRoutes />
    </>
  );
}

export default App;