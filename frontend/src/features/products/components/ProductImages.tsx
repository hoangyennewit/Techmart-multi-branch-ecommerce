import {Product} from "../types";
type Props = {
    product : Product;
};

export const ProductImages = ({product}: Props) => {
    return (
        <div className="">
            <div >
                <img src="{product.images[0]?url}" 
                alt="{product.name}" className=""/>
            </div>
            <div>
                {product.images.map((img) =>(
                    <img
                        key = {img.id}
                        src = {img.url}
                        alt = {product.name}
                    />
                ))}
            </div>
        </div>
    );
};