"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./book.entity");
let BooksService = class BooksService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async getAllBooks() {
        const books = await this.bookRepository.find();
        if (!books) {
            throw new common_1.NotFoundException(`No books are found in the database.`);
        }
        return books;
    }
    async getBookByID(id) {
        const found = await this.bookRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found.`);
        }
        return found;
    }
    async getBookCover(id) {
        const book = await this.getBookByID(id);
        return book.coverImage;
    }
    async createBook(createBookDto) {
        const book = new book_entity_1.Book();
        book.title = createBookDto.title;
        book.author = createBookDto.author;
        book.category = createBookDto.category;
        book.backgroundStory = createBookDto.backgroundStory;
        book.exampleQuote = createBookDto.exampleQuote;
        book.synopsis = createBookDto.synopsis;
        book.price = createBookDto.price;
        book.coverImage = createBookDto.coverImage;
        return this.bookRepository.save(book);
    }
    async updateBook(id, updateBookDto) {
        const book = await this.getBookByID(id);
        book.title = updateBookDto.title;
        book.author = updateBookDto.author;
        book.price = updateBookDto.price;
        return await this.bookRepository.save(book);
    }
    async deleteBook(id) {
        const found = await this.getBookByID(id);
        if (!found) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found.`);
        }
        await this.bookRepository.delete(id);
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map