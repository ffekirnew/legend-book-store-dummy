import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  // Initialize a new book repository that will connect with the database and perform
  // type orm activities
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
   * @throws {ConflictException} if a book with the same title already exists in the database.
   * @returns A Promise that resolves to a Book entity that was just added to the database.
   */
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = new Book();

    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.price = createBookDto.price;

    // Add the book to the database
    try {
      return await this.bookRepository.save(book);
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException(`A book with the same title already exists in the database.`)
      }
    }
  }

  /**
   * Updates a book in the database.
   * 
   * @param {number} id The id of the book to be updated.
   * @param {CreateBookDto} updateBookDto The data for the new book.
   * @throws {NotFoundException} If the book with the given ID wasn't found.
   * @returns {Promise<Book>} A promise that resolves to the updated book.
   */
  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book: Book = await this.getBookByID(id);

    book.title = updateBookDto.title;
    book.author = updateBookDto.author;
    book.price = updateBookDto.price;

    // Add the book to the database
    return await this.bookRepository.save(book);
  }

  /**
   * Deletes a book in the database.
   * 
   * @param {number} id The id of the book to be deleted.
   * @throws {NotFoundException} If the book with the given ID wasn't found.
   * @returns {Promise<void>} Nothing.
   */
  async deleteBook(id: number): Promise<void> {
    const found: Book = await this.getBookByID(id);

    if (!found) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    
    await this.bookRepository.delete(id);
  }
}
