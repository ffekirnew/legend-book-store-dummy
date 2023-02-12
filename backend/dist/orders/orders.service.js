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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("../books/book.entity");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
let OrdersService = class OrdersService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async getAllOrders() {
        const orders = await this.orderRepository.find();
        if (!orders) {
            throw new common_1.NotFoundException(`No orders found in the database.`);
        }
        return orders;
    }
    async getOrderByID(id) {
        const found = await this.orderRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`No order was found with the id ${id}.`);
        }
        return found;
    }
    async createOrder(createOrderDto) {
        const newOrder = new order_entity_1.Order();
        newOrder.firstName = createOrderDto.firstName;
        newOrder.lastName = createOrderDto.lastName;
        newOrder.phone = createOrderDto.phone;
        newOrder.location = createOrderDto.location;
        newOrder.book = new book_entity_1.Book();
        return await this.orderRepository.save(newOrder);
    }
    async updateOrder(id, updateOrderDto) {
        const order = await this.getOrderByID(id);
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found.`);
        }
        else {
            order.firstName = updateOrderDto.firstName;
            order.lastName = updateOrderDto.lastName;
            order.phone = updateOrderDto.phone;
            order.location = updateOrderDto.location;
            return await this.orderRepository.save(order);
        }
    }
    async deleteOrder(id) {
        const found = this.getOrderByID(id);
        if (!found) {
            throw new common_1.NotFoundException(`Book with id ${id} not found.`);
        }
        await this.orderRepository.delete(id);
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map