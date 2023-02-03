import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(): Promise<Order[]>;
    getOrderByID(id: number): Promise<Order>;
}
