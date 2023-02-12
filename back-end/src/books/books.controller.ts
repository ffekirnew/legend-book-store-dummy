import { Controller, Post, Body, UploadedFile, Req, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${randomName}-${file.originalname}`);
        },
      }),
    }),
  )
  async addBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() coverImage,
    @Req() req,
  ) {
    createBookDto.coverImage = coverImage.filename;

    return this.booksService.addBook(createBookDto);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.booksService.getAllBooks();
  }
}
