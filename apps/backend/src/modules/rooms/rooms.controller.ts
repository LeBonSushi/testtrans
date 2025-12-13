import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  async create(@GetUser('id') userId: string, @Body() data: any) {
    return this.roomsService.create(userId, data);
  }

  @Get(':id')
  async getRoom(@Param('id') id: string) {
    return this.roomsService.findById(id);
  }

  @Post(':id/join')
  async joinRoom(@Param('id') roomId: string, @GetUser('id') userId: string) {
    return this.roomsService.joinRoom(roomId, userId);
  }

  @Post(':id/leave')
  async leaveRoom(@Param('id') roomId: string, @GetUser('id') userId: string) {
    return this.roomsService.leaveRoom(roomId, userId);
  }

  @Post(':id/proposals')
  async createProposal(
    @Param('id') roomId: string,
    @GetUser('id') userId: string,
    @Body() data: any
  ) {
    return this.roomsService.createProposal(roomId, userId, data);
  }

  @Post(':roomId/proposals/:proposalId/vote')
  async vote(
    @Param('proposalId') proposalId: string,
    @GetUser('id') userId: string,
    @Body() data: { vote: 'YES' | 'NO' | 'MAYBE' }
  ) {
    return this.roomsService.vote(proposalId, userId, data.vote);
  }
}
