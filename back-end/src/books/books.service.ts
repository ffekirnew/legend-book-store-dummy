import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  /**
   * Retrieves all books from the database.
   * 
   * @returns {Promise<Book[]>} A promise that resolves to a list of books.
   * @throws {NotFoundException} If no books exist in the database.
   */
  async getAllBooks(): Promise<Book[]> {
    const books: Book[] = await this.bookRepository.find();

    if (!books) {
      throw new NotFoundException(`No books are found in the database.`)
    }

    return books;
  }

  /**
   * Retrieves a book from the database by ID.
   *
   * @param {number} id - The ID of the book to retrieve.
   * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
   * @throws {NotFoundException} If the book with the specified ID is not found.
   */
  async getBookByID(id: number): Promise<Book> {
    const found: Book = await this.bookRepository.findOne({ where: { id }});

    if (!found) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }

    return found;
  }

  /**
   * Adds a new book to the database.
   * 
   * @param createBookDto The book to be created
   * @returns A Promise that resolves to a Book entity that was just added to the database.
   */
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = new Book();

    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.price = createBookDto.price;

    // Add the book to the database
    return await this.bookRepository.save(book);
  }

  /**
   * Adds a new book to the database.
   * 
   * @param createBookDto The book to be created
   * @returns A Promise that resolves to a Book entity that was just added to the database.
   */
  async updateBook(updateBookDto: UpdateBookDto): Promise<Book> {
    const book: Book = new Book();

    book.title = updateBookDto.title;
    book.author = updateBookDto.author;
    book.price = updateBookDto.price;

    // Add the book to the database
    return await this.bookRepository.save(book);
  }

  // async findAll(): Promise<Book[]> {
  //   return await this.bookRepository.find();
  // }

  // async findOne(id: number): Promise<Book> {
  //   return await this.bookRepository.findOne({ where: { id } });
  // }

  // async create(book: Book): Promise<Book> {
  //   return await this.bookRepository.save(book);
  // }

  // async update(id: number, book: Book): Promise<void> {
  //   await this.bookRepository.update(id, book);
  // }

  // async delete(id: number): Promise<void> {
  //   await this.bookRepository.delete(id);
  // }
}
