import {Product} from "../types";
import { useState } from "react";

type Props = {
    product : Product;
};

export const ProductSpecs = ({product}: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if(!product.specs || product.specs.length === 0) {
        return null;
    }
    const displayedSpecs = isExpanded ? product.specs : product.specs.slice(0, 5);
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Thông số kỹ thuật</h2>
                {product.specs.length > 5 && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? "Thu gọn" : "Xem tất cả"}
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />                        
                        </svg>
                    </button>                
                )}
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {product.specs.map((spec, index) => (
                    <div key={index} 
                        className= {`flex py-3 px-4 text-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <span className="w-2/5 text-gray-500">{spec.name}</span>
                        <span className="w-3/5 text-gray-800">{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};