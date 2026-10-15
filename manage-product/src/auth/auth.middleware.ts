import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorization = req.header('authorization');
    if (!authorization?.startsWith('Bearer ') || !authorization.slice(7).trim()) {
      return next(new UnauthorizedException('Cần cung cấp Bearer token'));
    }

    const authServiceUrl = (process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000')
      .replace(/\/$/, '');

    try {
      const response = await fetch(`${authServiceUrl}/auth`, {
        headers: { Authorization: authorization },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        return next(new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn'));
      }

      next();
    } catch {
      next(new ServiceUnavailableException('Không thể kết nối đến dịch vụ xác thực'));
    }
  }
}
