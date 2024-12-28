import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ValidateIdDto } from 'src/dto/user.dto';

// eslint-disable-next-line prettier/prettier
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/api/create-users')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        success: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to create user',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('api/update-user/:id')
  // eslint-disable-next-line prettier/prettier
    async update(
    @Param() params: ValidateIdDto, // Destructure id from ValidateIdDto
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = this.userService.update(params, updateUserDto);
      return {
        success: true,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
