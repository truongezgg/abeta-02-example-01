import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class OptionalParseFilePipe implements PipeTransform {
  transform(files: Express.Multer.File[], metadata: ArgumentMetadata) {
    if (!files || files.length === 0) {
      // If no files are provided, simply return an empty array or null based on your needs
      return [];
    }
    // Otherwise, perform your usual file validation
    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        throw new UnprocessableEntityException('Invalid file type');
      }
    }
    return files;
  }
}
