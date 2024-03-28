import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Entity()
export class Reserve {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(() => User, (user) => user.Reserves)
    user: User;

    @ManyToOne(() => Concert, (concert) => concert.Reserves)
    concert: Concert;

    @Column()
    NumberOfSeats: number;

    @Column({ type: 'timestamp' })
    ReserveDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CreatedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    UpdatedAt: Date;
}
