import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private readonly booksRepository;
    constructor(booksRepository: Repository<Book>);
    addBook(createBookDto: CreateBookDto): Promise<Book>;
}
