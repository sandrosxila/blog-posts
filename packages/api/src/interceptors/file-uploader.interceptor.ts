import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';

export function FileUploader(destination: string) {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination,
        filename: (req, file, next) => {
          const name = randomBytes(32).toString('hex');
          next(null, `${name}${extname(file.originalname)}`);
        },
      }),
    }),
  );
}
