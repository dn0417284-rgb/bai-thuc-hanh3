import { Injectable } from '@nestjs/common';
import { User } from './users.model.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findByUserName(userName: string) {
    const user = await this.usersRepo.findOne({
      where: { userName },
    });

    return user;
  }

  async save(user: User) {
    return this.usersRepo.save(user);
  }
}
