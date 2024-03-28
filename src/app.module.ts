import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { ReserveModule } from './reserve/reserve.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Concert } from './concert/entities/concert.entity';
import { Reserve } from './reserve/entities/reserve.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Concert, Reserve],
      synchronize: true,
    }),
    UserModule,
    ConcertModule,
    ReserveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
