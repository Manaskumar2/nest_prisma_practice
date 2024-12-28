import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from './../database/database.service';
import { ValidateIdDto, UpdateUserDto } from './../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly DatabaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    return this.DatabaseService.user.create({ data: createUserDto });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async update({ id }: ValidateIdDto, updateUserDto: UpdateUserDto) {
    return this.DatabaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
