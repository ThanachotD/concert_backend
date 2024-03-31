import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserve } from 'src/reserve/entities/reserve.entity';

@Entity()
export class Concert {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ConcertName: string;

    @Column()
    TotalSeats: number;

    @Column({ type: 'text', nullable: true }) // Optional
    Description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    UpdatedAt: Date;

    @OneToMany(() => Reserve, reserve => reserve.concert)
    Reserves: Reserve[];

}
