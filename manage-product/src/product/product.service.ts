import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity/product.entity.js';
import { CreateProductDto } from './product.dto/createProduct.dto.js';
import { UpdateProductDto } from './product.dto/updateProduct.dto.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Lấy tất cả sản phẩm
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({});
  }

  // Lấy chi tiết sản phẩm
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có id = ${id}`);
    }

    return product;
  }

  // Tạo sản phẩm
  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);

    return this.productRepository.save(product);
  }

  // Cập nhật sản phẩm
  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, dto);

    return this.productRepository.save(product);
  }

  // Xóa sản phẩm
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }
}
