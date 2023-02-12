import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    getAllBooks(): Promise<Book[]>;
    getBookByID(id: number): Promise<Book>;
    getBookCover(id: number): Promise<string>;
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteBook(id: number): Promise<void>;
}
