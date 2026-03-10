import {useState} from "react";
import {ProductImage} from "../../types";
import {ProductThumbnails} from "./ProductThumbnails";

type Props = {
    images: ProductImage[];
};
export const ProductGallery = ({images}: Props) => {
    const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
    return (
        <div>
            <div className="rounded-lg p-1 border-1 border-gray-300 ">
                <img src={selectedImage.url} className="w-100 h-100 object-cover" />
            </div>
            <ProductThumbnails
                images = {images}
                selectedImage = {selectedImage}
                onSelectedImage = {setSelectedImage}
            />
        </div>

    );
};