import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quote: string;

  @Column()
  author: string;
}
