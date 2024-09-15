import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Метод для генерации JWT токена
  async generateToken(user: any) {
    const payload = { name: user.name, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Валидация пользователя (можно доработать на основе БД)
  async validateUser(name: string, password: string): Promise<any> {
    // Тут можно добавить логику проверки из базы данных
    const user = User.findOne({ where: { name, password } });
    if (user) {
      return { user };
    }
    return null;
  }
}
