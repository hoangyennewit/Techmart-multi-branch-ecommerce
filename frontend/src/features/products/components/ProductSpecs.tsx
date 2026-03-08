import {Product} from "../types";
type Props = {
    product : Product;
};
export const ProductSpecs = ({product}: Props) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold mb-4">Thông số kỹ thuật</h2>
                <a href="#" className="text-blue-500 hover:underline mb-4 block">Xem tất cả</a>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {product.specs.map((spec, index) => (
                    <div key={index} className="flex">
                        <span className="font-semibold w-40">{spec.name}:</span>
                        <span>{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};