import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Retrieves all orders from the database.
   *
   * @returns {Promise<Book[]>} All orders found in the database.
   * @throws {NotFoundException} If the no orders exist in the database.
   */
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }
  
  /**
   * Retrieves all books from the database.
   * 
   * @returns {Promise<Book[]>} A promise that resolves to a the order with the given ID.
   * @throws {NotFoundException} If no order exists in the database with the given ID.
   */
  @Get(":id")
  async getOrderByID(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getOrderByID(id);
  }
}
