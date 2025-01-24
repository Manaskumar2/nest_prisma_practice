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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ValidateIdDto } from 'src/dto/user.dto';
import { FirebaseAuthGuard } from 'src/config/firebase-auth.guard';
import { ResponseService } from 'src/core/response/response.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/api/create-users')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.responseService.success(await this.userService.create(createUserDto), 'User created successfully');
    } catch (error) {
      return this.responseService.error('Failed to create user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.responseService.success(await this.userService.findAll(), 'Users retrieved successfully');
  }

  @UseGuards(FirebaseAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return this.responseService.success(user, 'User retrieved successfully');
    } catch (error) {
      return this.responseService.error('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(FirebaseAuthGuard)
  @Put('api/update-user/:id')
  async update(
    @Param() params: ValidateIdDto, // Destructure id from ValidateIdDto
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.update(params, updateUserDto);
      return this.responseService.success(user, 'User updated successfully');
    } catch (error) {
      return this.responseService.error('Failed to update user', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return this.responseService.success(null, 'User deleted successfully');
    } catch (error) {
      return this.responseService.error('Failed to delete user', HttpStatus.BAD_REQUEST);
    }
  }
}
