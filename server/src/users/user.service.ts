import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async addUser(
    name: string,
    password: string,
    email: string,
    phone: string,
  ): Promise<User> {
    const user = new User({ name, password, email, phone });
    return user.save();
  }

  async getUser(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }
}
