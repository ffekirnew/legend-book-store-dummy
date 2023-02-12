import { BooksController } from 'src/books/books.controller';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly booksController;
    constructor(orderRepository: Repository<Order>, booksController: BooksController);
    getAllOrders(): Promise<Order[]>;
    getOrderByID(id: number): Promise<Order>;
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
