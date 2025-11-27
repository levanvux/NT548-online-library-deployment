import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';
import { QuotesModule } from './quotes/quotes.module';
import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: Number(config.get<number>('DB_PORT')) || 3307,
        username: config.get<string>('DB_USERNAME') || 'eshelf_user',
        password: config.get<string>('DB_PASSWORD') || 'eshelf_password',
        database: config.get<string>('DB_NAME') || 'eshelf_db',
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
    BooksModule,
    GenresModule,
    QuotesModule,
    AuthModule,
    BookmarksModule,
  ],
})
export class AppModule {}
