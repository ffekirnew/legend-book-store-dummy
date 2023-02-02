import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, BooksModule, OrdersModule],
})
export class AppModule {}
