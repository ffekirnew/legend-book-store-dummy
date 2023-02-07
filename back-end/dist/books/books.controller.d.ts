import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getAllBooks(): Promise<Book[]>;
    getBookByID(id: number): Promise<Book>;
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteBook(id: number): Promise<void>;
}
