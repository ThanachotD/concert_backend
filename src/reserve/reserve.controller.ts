import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reserve')
@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new reserve' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Reserve created successfully', type: CreateReserveDto })
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reserveService.create(createReserveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all reserves' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reserves retrieved successfully', type: [CreateReserveDto] })
  findAll() {
    return this.reserveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reserve by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reserve found', type: CreateReserveDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reserve not found' })
  findOne(@Param('id') id: string) {
    return this.reserveService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cancel a reserve by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reserve cancel successfully', type: CreateReserveDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reserve not found' })
  cancel(@Param('id') id: string) {
    return this.reserveService.cancel(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a reserve by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reserve deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reserve not found' })
  remove(@Param('id') id: string) {
    return this.reserveService.remove(+id);
  }
}
