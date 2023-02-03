import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    getAllOrders(): Promise<Order[]>;
    getOrderByID(id: number): Promise<Order>;
}
