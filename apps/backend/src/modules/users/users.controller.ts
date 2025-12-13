import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id/profile')
  async updateProfile(@Param('id') id: string, @GetUser('id') userId: string, @Body() data: any) {
    // TODO: Add authorization check (user can only update their own profile)
    return this.usersService.updateProfile(id, data);
  }

  @Get(':id/rooms')
  async getUserRooms(@Param('id') id: string) {
    return this.usersService.getUserRooms(id);
  }

  @Get(':id/friends')
  async getUserFriends(@Param('id') id: string) {
    return this.usersService.getUserFriends(id);
  }
}
