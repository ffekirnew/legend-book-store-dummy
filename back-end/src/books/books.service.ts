import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.category = createBookDto.category;
    book.backgroundStory = createBookDto.backgroundStory;
    book.exampleQuote = createBookDto.exampleQuote;
    book.synopsis = createBookDto.synopsis;
    book.price = createBookDto.price;
    book.coverImage = createBookDto.coverImage;

    return this.booksRepository.save(book);
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.booksRepository.find();
  }
}
