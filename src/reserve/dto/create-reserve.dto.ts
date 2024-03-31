import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsEnum } from 'class-validator';
import { Type } from '../../utils/enum';

export class CreateReserveDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    concertId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    NumberOfSeats: number;

    @ApiProperty({ enum: Type, enumName: 'Type' })
    @IsEnum(Type)
    Type: string;
}
