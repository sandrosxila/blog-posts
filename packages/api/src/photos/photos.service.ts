import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class PhotosService {
  getFile(id: string, name: string) {
    try {
      const file = createReadStream(
        join(__dirname, `../../uploads/photos/${id}/${name}`),
      );
      return file;
    } catch {
      throw new BadRequestException('Photo not found');
    }
  }

  async remove(id: string, name: string) {
    try {
      await unlink(join(__dirname, `../../uploads/photos/${id}/${name}`));
      // Remove from DB
    } catch {
      throw new BadRequestException('file is not deleted or not found');
    }
  }
}
