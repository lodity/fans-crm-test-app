import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  phone: string;
}
