import { Book } from 'src/books/entities/book.entity';
export declare class Order {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    book: Book;
}
