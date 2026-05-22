import React from 'react';
import { Filter } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
}

interface BrandFilterProps {
  activeBrand: number | null;
  onBrandChange: (brandId: number | null) => void;
  onFilterClick: () => void;
  hasActiveFilter?: boolean;
}

const brands: Brand[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Samsung' },
  { id: 3, name: 'Xiaomi' },
  { id: 4, name: 'OPPO' },
  { id: 5, name: 'Vivo' },
  { id: 6, name: 'Dell' },
  { id: 7, name: 'HP' },
  { id: 8, name: 'ASUS' },
  { id: 9, name: 'Sony' },
  { id: 10, name: 'Lenovo' }
];

export const BrandFilter: React.FC<BrandFilterProps> = ({ activeBrand, onBrandChange, onFilterClick, hasActiveFilter }) => {

  const handleBrandClick = (id: number) => {
    // Nếu bấm lại vào hãng đang chọn thì bỏ chọn (về null)
    onBrandChange(activeBrand === id ? null : id);
  };

  return (
    <div className="flex items-center gap-4 py-6 overflow-x-auto no-scrollbar">
      {/* Nút Lọc chính */}
      <button
        onClick={onFilterClick}
        className={`relative flex items-center gap-2 px-6 py-2.5 border-2 rounded-xl font-bold transition-all whitespace-nowrap group flex-shrink-0 ${
          hasActiveFilter
            ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
            : 'border-blue-500 text-blue-600 hover:bg-blue-50'
        }`}
      >
        <Filter className="w-5 h-5 stroke-[2.5px] group-hover:scale-110 transition-transform" />
        <span>Lọc</span>
        {hasActiveFilter && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Danh sách các Hãng */}
      <div className="flex items-center gap-3">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => handleBrandClick(brand.id)}
            className={`
              h-12 px-8 flex items-center justify-center rounded-xl border-2 transition-all
              ${activeBrand === brand.id
                ? 'border-blue-500 bg-white shadow-lg scale-105 z-10'
                : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm'}
            `}
          >
            <span className={`text-sm font-black tracking-tighter ${
              activeBrand === brand.id ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {brand.name.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};