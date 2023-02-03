import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * Retrieves all books from the database.
   * 
   * @returns {Promise<Book[]>} A promise that resolves to a list of orders.
   * @throws {NotFoundException} If no orders exist in the database.
   */
  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find();

    if (!orders) {
      throw new NotFoundException(`No orders found in the database.`);
    }

    return orders;
  }

  /**
   * Retrieves all books from the database.
   * 
   * @returns {Promise<Book[]>} A promise that resolves to a the order with the given ID.
   * @throws {NotFoundException} If no order exists in the database with the given ID.
   */
  async getOrderByID(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`No order was found with the id ${id}.`);
    }

    return found;
  }
}
