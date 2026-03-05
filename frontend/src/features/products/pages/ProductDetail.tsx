import {useParams} from "react-router-dom";
export const ProductDetail = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>Product Detail Page</h1>
        </div>
    );
};