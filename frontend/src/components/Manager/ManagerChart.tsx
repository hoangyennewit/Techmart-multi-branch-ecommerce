import React from 'react';

export interface ChartData {
  label: string;
  actual: number;
  target: number;
}

interface Props {
  data: ChartData[];
}

export const ManagerChart = ({ data }: Props) => {
  return (
    <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
      <div className="h-64 flex items-end justify-between gap-1 border-b border-gray-200 pb-2 relative">
        {/* Trục Y */}
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400 font-bold py-2">
          <span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span>
        </div>
        
        {/* Các Cột biểu đồ */}
        {data.map((item, idx) => (
          <div key={idx} className="flex gap-1 items-end h-full w-full justify-center group relative pt-4">
            <div style={{ height: `${item.actual}%` }} className="w-3 sm:w-4 md:w-5 bg-purple-600 rounded-t-sm hover:opacity-80 transition-opacity"></div>
            <div style={{ height: `${item.target}%` }} className="w-3 sm:w-4 md:w-5 bg-orange-300 rounded-t-sm hover:opacity-80 transition-opacity"></div>
            <span className="absolute -bottom-6 text-xs font-bold text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-8 text-xs font-bold text-gray-500">
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-600 rounded-sm"></span> Thực tế</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-300 rounded-sm"></span> Dự kiến</div>
      </div>
    </div>
  );
};