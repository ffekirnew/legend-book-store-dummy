import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(): Promise<Order[]>;
    getOrderByID(id: number): Promise<Order>;
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
