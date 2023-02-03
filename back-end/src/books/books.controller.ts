import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  
  /**
   * Retrieves a book from the database by its ID.
   *
   * @returns {Promise<Book[]>} All books found in the database.
   * @throws {NotFoundException} If the no books exist in the database.
   */
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }
  
  /**
   * Retrieves a book from the database by its ID.
   *
   * @param {number} id - The ID of the book to retrieve.
   * @returns {Promise<Book>} A promise that resolves to the book with the specified ID.
   * @throws {NotFoundException} If the book with the specified ID is not found.
   */
  @Get("/:id")
  async getBookByID(@Param("id", ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.getBookByID(id);
  }

  /**
   * Creates a new book in the database.
   * 
   * @param {CreateBookDto} createBookDto The data for the new book.
   * @returns {Promise<Book>} A promise that resolves to the newly created book.
   */
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.createBook(createBookDto);
  }
}
