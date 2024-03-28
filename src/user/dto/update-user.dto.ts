import { UserRole } from 'src/utils/enum';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    FirstName?: string;

    @IsOptional()
    LastName?: string;

    @IsOptional()
    Email?: string;

    @IsOptional()
    Role?: UserRole;
}
