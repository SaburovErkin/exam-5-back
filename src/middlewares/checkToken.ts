import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req)
    

    if (token) {
      try {
        const decoded = await this.jwtService.verify(token);
        req.user = decoded;

        next();
      } catch (err) {
        res.status(401).send({ message: err.message });
      }
    } else {
      res
        .status(401)
        .send({ message: 'JWT token not found in Authorization header' });
    }
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}