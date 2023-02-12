import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getAllBooks(): Promise<Book[]>;
    getBookByID(id: number): Promise<Book>;
    getImage(id: number, res: Response): Promise<void>;
    createBook(createBookDto: CreateBookDto, coverImage: any, req: any): Promise<Book>;
    updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteBook(id: number): Promise<void>;
}
