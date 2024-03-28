import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserve } from 'src/reserve/entities/reserve.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    Email: string;

    @Column()
    Role: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    UpdatedAt: Date;

    @OneToMany(() => Reserve, (reserve) => reserve.user)
    Reserves: Reserve[];
}

