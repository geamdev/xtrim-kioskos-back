import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ValidacionBasicMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers['api-key'] as string;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req['basic'] = decoded;
        next();
      } catch (error) {
        console.log(error);
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } else if (apiKey) {
      this.validateApiKey(apiKey, next);
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  private validateApiKey(encryptedApiKey: string, next: NextFunction) {
    const secretKey = process.env.SECRET_KEY;

    try {
      const apiKeyDecrypted = CryptoJS.AES.decrypt(
        encryptedApiKey,
        secretKey,
      ).toString(CryptoJS.enc.Utf8);

      if (!apiKeyDecrypted) {
        throw new HttpException(
          'Error al procesar su solicitud',
          HttpStatus.BAD_REQUEST,
        );
      }

      const [apiKey, apiKeyExpiration] = apiKeyDecrypted.split('|');
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > Number(apiKeyExpiration)) {
        throw new HttpException('Token expirado', HttpStatus.FORBIDDEN);
      }

      if (apiKey === process.env.API_KEY) {
        next();
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error interno al procesar su solicitud',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
