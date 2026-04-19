// src/dtos/productDto.ts
export class CreateProductDto {
    public name: string;
    public price: number;
    public description: string;
    public categoryId: number;
    public brandId: number;

    // constructor sẽ làm nhiệm vụ "Bảo vệ" và "Ép kiểu"
    constructor(data: any) {
        if (!data.name) throw new Error("Tên sản phẩm không được để trống");
        if (!data.price || data.price <= 0) throw new Error("Giá bán phải lớn hơn 0");

        this.name = data.name;
        this.price = Number(data.price);
        this.description = data.description || '';
        this.categoryId = Number(data.categoryId);
        this.brandId = Number(data.brandId);
    }
}