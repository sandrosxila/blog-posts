import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class PhotosService {
  getFile(name: string) {
    const path = join(process.cwd(), `/uploads/photos/${name}`);
    if (existsSync(path)) {
      const file = createReadStream(
        join(process.cwd(), `/uploads/photos/${name}`),
      );
      return file;
    } else {
      throw new BadRequestException('Photo not found');
    }
  }

  async remove(name: string) {
    try {
      await unlink(join(process.cwd(), `/uploads/photos/${name}`));
    } catch {
      throw new BadRequestException('photo is not deleted or not found');
    }
  }
}
