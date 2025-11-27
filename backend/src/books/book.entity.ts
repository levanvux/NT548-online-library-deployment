import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  isbn: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  author: string[];

  @Column({ type: 'json', nullable: true })
  translator: string[];

  @Column({ nullable: true })
  publisher: string;

  @Column({ type: 'json', nullable: true })
  genres: string[];

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ nullable: true })
  language: string;

  @Column({ type: 'int', nullable: true })
  pages: number;

  @Column({ nullable: true })
  extension: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ nullable: true })
  pdfUrl: string;
}
