import {useParams} from "react-router-dom";
import {Header} from "../../../components/Header";
import {ProductSpecs} from "../components/ProductSpecs";
export const ProductPage = () => {
    const {id} = useParams();
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                {/* Sản phẩm */}
                <div>
                    <div>
                        
                    </div>
                </div>
                {/* Chi tiết thông số sản phẩm */}
                <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg border-orange-300 border-2 shadow-md">
                    <ProductSpecs />
                </div>
                {/* Bình Luận */}
                <div>

                </div>
            </div>
        </div>
    );
};