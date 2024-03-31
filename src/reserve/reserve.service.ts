import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Reserve } from './entities/reserve.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReserveService {
  [x: string]: any;
  constructor(
    @InjectRepository(Reserve) private reservesRepository: Repository<Reserve>,
    @InjectRepository(Concert) private concertsRepository: Repository<Concert>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private connection: Connection // Inject for transactions
  ) { }

  async create(createReserveDto: CreateReserveDto): Promise<Reserve> {
    const concert = await this.concertsRepository.findOne({
      where: { Id: createReserveDto.concertId }
    });
    if (!concert) {
      throw new NotFoundException(`Concert #${createReserveDto.concertId} not found`);
    }

    if (concert.TotalSeats <= 0) {
      throw new BadRequestException('Not enough seats available');
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newReserve = this.reservesRepository.create(createReserveDto);
      newReserve.user = await this.userRepository.findOne({ where: { Id: createReserveDto.userId } });
      newReserve.concert = concert;
      concert.TotalSeats -= createReserveDto.NumberOfSeats

      await queryRunner.manager.save(newReserve);
      await queryRunner.manager.save(concert);

      await queryRunner.commitTransaction();
      return newReserve;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Reserve[]> {
    return await this.reservesRepository.find({
      relations: ['user', 'concert'],
    });
  }

  async findOne(id: number): Promise<Reserve> {
    const reserve = await this.reservesRepository.findOne({ where: { Id: id } });
    if (!reserve) {
      throw new NotFoundException(`Reserve #${id} not found`);
    }
    return reserve;
  }

  async cancel(id: number): Promise<Concert> {
    const concert = await this.concertsRepository.findOneBy({ Id: id });

    if (!concert) {
      throw new NotFoundException(`Concert with ID ${id} not found.`);
    }

    concert.TotalSeats += 1;
    concert.UpdatedAt = new Date(); // Sets to the current date and time

    return this.concertsRepository.save(concert);
  }

  async remove(id: number) {
    const result = await this.reservesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reserve #${id} not found`);
    }
  }
}
