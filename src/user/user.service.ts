import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ValidateIdDto, UpdateUserDto, CreateUserDto } from './../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly DatabaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    return this.DatabaseService.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.DatabaseService.user.findMany();
  }

  async findOne(uid: string) {
    return await this.DatabaseService.user.findUnique({
      where: { uid: uid },
      select: { id: true, email: true }, // Add the required fields
    });
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
