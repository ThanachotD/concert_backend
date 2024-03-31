import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule { }
