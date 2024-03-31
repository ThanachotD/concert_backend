import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveDto } from './create-reserve.dto';
import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateReserveDto extends PartialType(CreateReserveDto) {
    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    Id?: number;
}
