import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class ImagesService {
  getFile(name: string) {
    const file = createReadStream(
      join(__dirname, `../../uploads/images/${name}`),
    );

    return file;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeFromDb(name: string) {
    // TODO: remove from db
  }

  async remove(name: string) {
    try {
      await unlink(join(__dirname, `../uploads/images/${name}`));
    } catch {
      throw new BadRequestException('file is not deleted or not found');
    }
  }
}
