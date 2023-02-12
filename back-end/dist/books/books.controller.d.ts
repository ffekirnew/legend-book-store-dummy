import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    addBook(createBookDto: CreateBookDto, coverImage: any, req: any): Promise<Book>;
    getAllBooks(): Promise<Book[]>;
}
