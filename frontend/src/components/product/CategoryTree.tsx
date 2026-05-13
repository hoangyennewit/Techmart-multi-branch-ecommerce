import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const CategoryTree = () => {
  // Trạng thái mở/đóng của các thư mục
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({
    'goc': true,
    'dienthoai': true,
    'laptop': false,
  });

  const toggleNode = (node: string) => {
    setOpenNodes(prev => ({ ...prev, [node]: !prev[node] }));
  };

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-[2rem] p-5 shadow-sm min-h-[500px] overflow-y-auto">
      <ul className="text-sm font-bold text-gray-600 space-y-1">
        {/* Gốc */}
        <li>
          <div className="flex items-center gap-1 cursor-pointer hover:text-purple-700 py-1" onClick={() => toggleNode('goc')}>
            {openNodes['goc'] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
            <span className="text-gray-800">Gốc (15)</span>
          </div>
          
          {openNodes['goc'] && (
            <ul className="pl-6 mt-1 border-l border-gray-100 ml-2 space-y-1">
              
              {/* Điện thoại */}
              <li>
                <div className="flex items-center gap-1 cursor-pointer hover:text-purple-700 py-1" onClick={() => toggleNode('dienthoai')}>
                  {openNodes['dienthoai'] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                  <span>Điện thoại (5)</span>
                </div>
                {openNodes['dienthoai'] && (
                  <ul className="pl-6 mt-1 border-l border-gray-100 ml-2 space-y-2 text-gray-500 font-medium">
                    <li className="hover:text-purple-600 cursor-pointer text-purple-600">Apple</li>
                    <li className="hover:text-purple-600 cursor-pointer">Samsung</li>
                    <li className="hover:text-purple-600 cursor-pointer">Oppo</li>
                    <li className="hover:text-purple-600 cursor-pointer">Xiaomi</li>
                    <li className="hover:text-purple-600 cursor-pointer">Nokia</li>
                  </ul>
                )}
              </li>

              {/* Laptop */}
              <li>
                <div className="flex items-center gap-1 cursor-pointer hover:text-purple-700 py-1 mt-2" onClick={() => toggleNode('laptop')}>
                  {openNodes['laptop'] ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                  <span>Laptop (5)</span>
                </div>
                {openNodes['laptop'] && (
                  <ul className="pl-6 mt-1 border-l border-gray-100 ml-2 space-y-2 text-gray-500 font-medium">
                    <li className="hover:text-purple-600 cursor-pointer">Apple</li>
                    <li className="hover:text-purple-600 cursor-pointer">Samsung</li>
                  </ul>
                )}
              </li>

              {/* Tai nghe */}
              <li>
                <div className="flex items-center gap-1 cursor-pointer hover:text-purple-700 py-1 mt-2">
                  <ChevronRight size={16}/> <span>Tai nghe (2)</span>
                </div>
              </li>

              {/* Khác */}
              <li>
                <div className="flex items-center gap-1 cursor-pointer hover:text-purple-700 py-1 mt-2">
                  <ChevronRight size={16}/> <span>Khác (3)</span>
                </div>
              </li>

            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};