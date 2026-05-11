import {ProductImage} from "../../types";
type Props = {
    images: ProductImage[];
    selectedImage: ProductImage;
    onSelectedImage: (image: ProductImage) => void;
};

export const ProductThumbnails = ({images, selectedImage, onSelectedImage}: Props) => {
    return (
        <div className="mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="flex gap-3 px-1">
                {images.map((img) => (
                    <button
                        key={img.id}
                        onClick={() => onSelectedImage(img)}
                        className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                            img.id === selectedImage.id 
                                ? "border-orange-600 ring-2 ring-orange-200 ring-offset-1" 
                                : "border-transparent hover:border-orange-300"
                        }`}
                    >
                        <img
                            src={img.url}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};