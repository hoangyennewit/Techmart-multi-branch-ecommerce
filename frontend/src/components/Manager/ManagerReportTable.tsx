import React from 'react';

export interface ReportRow {
  date: string;
  revenue: string;
  profit: string;
  topProduct: string;
}

interface Props {
  data: ReportRow[];
}

export const ManagerReportTable = ({ data }: Props) => {
  return (
    <div>
      <h3 className="font-bold text-purple-900 mb-4">Báo cáo dữ liệu chi tiết</h3>
      <div className="overflow-x-auto border border-gray-200 rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">Ngày</th>
              <th className="px-4 py-3 border-b border-gray-200 text-right">Doanh thu</th>
              <th className="px-4 py-3 border-b border-gray-200 text-right">Lợi nhuận</th>
              <th className="px-4 py-3 border-b border-gray-200">Sản phẩm bán chạy</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-50/50 transition-colors border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-600">{row.date}</td>
                <td className="px-4 py-3 font-bold text-purple-700 text-right">{row.revenue}</td>
                <td className="px-4 py-3 font-bold text-emerald-600 text-right">{row.profit}</td>
                <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">{row.topProduct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};