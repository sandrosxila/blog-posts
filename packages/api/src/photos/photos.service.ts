import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class PhotosService {
  getFile(name: string) {
    try {
      const file = createReadStream(
        join(process.cwd(), `/uploads/photos/${name}`),
      );
      return file;
    } catch {
      throw new BadRequestException('Photo not found');
    }
  }

  async remove(name: string) {
    try {
      await unlink(join(__dirname, `../../uploads/photos/${name}`));
      // Remove from DB
    } catch {
      throw new BadRequestException('file is not deleted or not found');
    }
  }
}
