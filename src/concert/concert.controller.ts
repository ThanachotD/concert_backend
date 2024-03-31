import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@ApiTags('Concert')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new concert' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Concert created successfully', type: CreateConcertDto })
  create(@Body() createConcertDto: CreateConcertDto) {
    return this.concertService.create(createConcertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all concerts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Concerts retrieved successfully', type: [CreateConcertDto] })
  findAll() {
    return this.concertService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a concert by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Concert found', type: CreateConcertDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Concert not found' })
  findOne(@Param('id') id: string) {
    return this.concertService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a concert by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Concert updated successfully', type: UpdateConcertDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Concert not found' })
  update(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto) {
    return this.concertService.update(+id, updateConcertDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a concert by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Concert deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Concert not found' })
  remove(@Param('id') id: string) {
    return this.concertService.remove(+id);
  }
}
