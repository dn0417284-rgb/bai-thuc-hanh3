import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity/product.entity.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ProductController);
  }
}
