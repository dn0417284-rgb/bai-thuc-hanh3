import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';

import { ProductService } from './product.service.js';
import { CreateProductDto } from './product.dto/createProduct.dto.js';
import { UpdateProductDto } from './product.dto/updateProduct.dto.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // GET /products
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // POST /products
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // PUT /products/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  // DELETE /products/:id
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
