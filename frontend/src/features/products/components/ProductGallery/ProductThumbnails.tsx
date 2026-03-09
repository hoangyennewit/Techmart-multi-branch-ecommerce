import {ProductImage} from "../../types";
type Props = {
    images: ProductImage[];
    selectedImage: ProductImage;
    onSelectedImage: (image: ProductImage) => void;
};

export const ProductThumbnails = ({images, selectedImage, onSelectedImage}: Props) => {
    return (
        <div className="mt-4 flex space-x-2">
            <div className="flex space-x-5">
                {images.map((img) => (
                    <img
                        key={img.id}
                        src={img.url}
                        className={`w-16 h-16 object-cover cursor-pointer ${img.id === selectedImage.id ? "border-blue-500 border-2" : "border-gray-300 border"}`}
                        onClick={() => onSelectedImage(img)}
                    />
                ))}
            </div>
        </div>
    );
};