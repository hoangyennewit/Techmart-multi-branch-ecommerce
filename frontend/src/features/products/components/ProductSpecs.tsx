import {Product} from "../types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 text-sm uppercase">Thông số kỹ thuật</h3>
            </div>
            
            <div className="overflow-hidden">
                {displayedSpecs.map((spec, index) => (
                    <div key={index} 
                         className={`flex py-2.5 px-4 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <span className="w-1/3 text-gray-600 font-medium">{spec.name}</span>
                        <span className="w-2/3 text-gray-800">{spec.value}</span>
                    </div>
                ))}
            </div>
            
            {product.specs.length > 5 && (
                <div className="p-3 bg-white border-t border-gray-100 flex justify-center">
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? (
                            <>Thu gọn <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>Xem cấu hình chi tiết <ChevronDown className="w-4 h-4" /></>
                        )}
                    </button>                
                </div>
            )}
        </div>
    );
};
