import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateConcertDto {
    Id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ConcertName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    TotalSeats: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(300)
    Description?: string;

    CreatedAt: Date;

    UpdatedAt: Date;
}
