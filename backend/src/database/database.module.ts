import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { Users } from 'src/auth/users.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'legendbookstore',
      entities: [Book, Order, Users],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book, Order]),
  ],
})
export class DatabaseModule {}
