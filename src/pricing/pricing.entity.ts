import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pricing')
export class Pricing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string; // e.g. 'Basic Plan', 'Pro Plan'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceUSD: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceSAR: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descriptionEn?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descriptionAr?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
