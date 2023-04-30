import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class ImagesService {
  getFile(name: string) {
    const path = join(process.cwd(), `/uploads/images/${name}`);
    if (existsSync(path)) {
      const file = createReadStream(path);
      return file;
    } else {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(name: string) {
    try {
      await unlink(join(process.cwd(), `/uploads/images/${name}`));
    } catch {
      throw new BadRequestException('image is not deleted or not found');
    }
  }
}
