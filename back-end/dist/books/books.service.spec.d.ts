import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
export declare class BooksService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    findAll(): Promise<Book[]>;
    create(book: Book): Promise<void>;
}
