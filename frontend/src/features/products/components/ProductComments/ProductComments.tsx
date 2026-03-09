import { Product } from "../../types";
import {products} from "../../../../data/products";
import ReviewForm from "./ReviewForm";
type Props = {
    product: Product;
};
export const ProductComments = ({product}: Props) => {
    return (
        <div className="p-6 bg-white rounded-lg border-gray-300 border-2 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
            <div className="space-y-4">
                <ReviewForm onSubmit={(data) => {
                }} />
            </div>
        </div>
    );
}