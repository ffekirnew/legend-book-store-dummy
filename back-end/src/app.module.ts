import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [BooksModule, DatabaseModule, OrdersModule],
})
export class AppModule {}
