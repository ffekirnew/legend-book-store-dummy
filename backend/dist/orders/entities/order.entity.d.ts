import { Book } from 'src/books/book.entity';
export declare class Order {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    book: Book;
}
