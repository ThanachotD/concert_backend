import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from 'src/utils/enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    Id: number;

    @ApiProperty()
    @IsNotEmpty()
    FirstName: string;

    @ApiProperty()
    @IsNotEmpty()
    LastName: string;

    @ApiProperty()
    @IsEmail()
    Email: string;

    @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
    @IsEnum(UserRole)
    Role: UserRole;

    CreatedAt: Date;

    UpdatedAt: Date;
}
