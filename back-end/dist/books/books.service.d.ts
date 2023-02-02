import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
export declare class BooksService {
    create(createBookDto: CreateBookDto): string;
    findAll(): Book[];
    findOne(id: number): string;
    update(id: number, updateBookDto: UpdateBookDto): string;
    remove(id: number): string;
}
