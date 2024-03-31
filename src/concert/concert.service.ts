import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from './entities/concert.entity';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertsRepository: Repository<Concert>,
  ) { }

  async create(createConcertDto: CreateConcertDto): Promise<Concert> {
    const newConcert = this.concertsRepository.create(createConcertDto);
    return await this.concertsRepository.save(newConcert);
  }

  async findAll(): Promise<Concert[]> {
    return await this.concertsRepository.find();
  }

  async findOne(id: number): Promise<Concert> {
    const concert = await this.concertsRepository.findOne({ where: { Id: id } });
    if (!concert) {
      throw new NotFoundException(`Concert #${id} not found`);
    }
    return concert;
  }

  async update(id: number, updateConcertDto: UpdateConcertDto): Promise<Concert> {
    const concert = await this.findOne(id);
    const updated = { ...concert, ...updateConcertDto };
    const result = await this.concertsRepository.preload(updated);
    return await this.concertsRepository.save(result);
  }


  async remove(id: number) {
    const result = await this.concertsRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`Concert #${id} not found`);
    }
    return result;
  }
}
