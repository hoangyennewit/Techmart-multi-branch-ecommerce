import React from 'react';
import { ProductCard } from '../../../../components/product/ProductCard';

interface ProductSectionProps {
  title: string;
  products: any[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className="mb-12">
      {/* Tiêu đề danh mục dạng Pill */}
      <div className="inline-block px-6 py-2 bg-linear-to-r from-purple-600/90 to-purple-500/90 backdrop-blur-md border border-purple-400/50 rounded-full mb-8 shadow-lg">
        <span className="text-white font-bold tracking-wide text-lg">{title}</span>
      </div>

      {/* Lưới sản phẩm (Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};