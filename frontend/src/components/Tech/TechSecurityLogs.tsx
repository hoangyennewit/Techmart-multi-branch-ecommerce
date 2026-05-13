import React from 'react';
import { Clock } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho nhật ký
export interface LogItem {
  id: number;
  time: string;
  action: string;
  user: string;
}

interface Props {
  logs: LogItem[];
}

export const TechSecurityLogs = ({ logs }: Props) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200 flex flex-col h-full min-h-[400px]">
      <div className="flex items-center gap-3 justify-center mb-8 bg-gray-50 w-max mx-auto px-6 py-2 rounded-full border border-gray-200">
        <Clock className="text-gray-500" size={20} />
        <h2 className="text-xl font-bold text-gray-800">Nhật ký đăng nhập</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {logs.map(log => (
          <div key={log.id} className="flex gap-4 items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
            <span className="text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-lg text-sm min-w-[70px] text-center">
              {log.time}
            </span>
            <p className="text-gray-700 font-medium">
              {log.action} - <span className="font-bold text-gray-900">{log.user}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};