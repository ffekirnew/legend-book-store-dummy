import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
export declare class BooksService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    getAllBooks(): Promise<Book[]>;
    getBookByID(id: number): Promise<Book>;
    createBook(createBookDto: CreateBookDto): Promise<Book>;
    updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    deleteBook(id: number): Promise<void>;
}
