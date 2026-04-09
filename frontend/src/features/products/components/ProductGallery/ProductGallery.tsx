import {useEffect, useState} from "react";
import {ProductImage} from "../../types";
import {ProductThumbnails} from "./ProductThumbnails";

type Props = {
    images?: ProductImage[];
};
export const ProductGallery = ({images}: Props) => {
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(images?.[0] || null);
    useEffect(() => {
        if (images && images.length > 0) {
            setSelectedImage(images[0]);
        }
        else {
            setSelectedImage(null);
        }
    }, [images]);
    
    if(!selectedImage) {
        return (
            <div className="w-full aspect-square rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 font-medium">
                Sản phẩm chưa có hình ảnh
            </div>
        );
    }

    return (
        <div>
            <div className="rounded-lg p-1 border-1 border-gray-300 ">
                <img src={selectedImage.url} className="w-100 h-100 object-cover" />
            </div>
            {images && images.length > 1 && (
                <ProductThumbnails
                    images = {images}
                    selectedImage = {selectedImage}
                    onSelectedImage = {setSelectedImage}
                />
            )}
        </div>
    );
};