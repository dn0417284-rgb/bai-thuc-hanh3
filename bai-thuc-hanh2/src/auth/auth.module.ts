import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { AuthMiddleware } from './auth.middleware.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  providers: [AuthService, AuthMiddleware],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auth');
  }
}
