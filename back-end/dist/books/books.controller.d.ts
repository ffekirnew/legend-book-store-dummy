import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    addBook(createBookDto: CreateBookDto, coverImage: any, audioDescription: any, req: any): Promise<import("./book.entity").Book>;
}
