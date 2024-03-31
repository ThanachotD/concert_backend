import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './entities/reserve.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Reserve, Concert, User])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule { }
