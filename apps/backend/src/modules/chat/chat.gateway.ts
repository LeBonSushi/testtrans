import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { SOCKET_EVENTS } from '@travel-planner/shared';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets: Map<string, Set<string>> = new Map(); // userId -> Set<socketId>

  constructor(
    private chatService: ChatService,
    private jwtService: JwtService
  ) {}

  async handleConnection(client: Socket) {
    try {
      // Extract token from handshake (cookie or auth header)
      const token =
        client.handshake.auth.token || client.handshake.headers.cookie?.split('access_token=')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub;

      // Store user-socket mapping
      client.data.userId = userId;
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId)!.add(client.id);

      console.log(`✅ Client connected: ${client.id} (User: ${userId})`);
    } catch (error) {
      console.error('WebSocket auth failed:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId && this.userSockets.has(userId)) {
      this.userSockets.get(userId)!.delete(client.id);
      if (this.userSockets.get(userId)!.size === 0) {
        this.userSockets.delete(userId);
      }
    }
    console.log(`❌ Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(SOCKET_EVENTS.ROOM_JOIN)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string }
  ) {
    const userId = client.data.userId;
    client.join(`room:${data.roomId}`);

    await this.chatService.userJoinedRoom(data.roomId, userId);

    this.server.to(`room:${data.roomId}`).emit(SOCKET_EVENTS.USER_ONLINE, {
      userId,
      roomId: data.roomId,
    });

    return { success: true };
  }

  @SubscribeMessage(SOCKET_EVENTS.ROOM_LEAVE)
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string }
  ) {
    const userId = client.data.userId;
    client.leave(`room:${data.roomId}`);

    await this.chatService.userLeftRoom(data.roomId, userId);

    this.server.to(`room:${data.roomId}`).emit(SOCKET_EVENTS.USER_OFFLINE, {
      userId,
      roomId: data.roomId,
    });

    return { success: true };
  }

  @SubscribeMessage(SOCKET_EVENTS.MESSAGE_SEND)
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; content: string }
  ) {
    const userId = client.data.userId;

    const message = await this.chatService.createMessage(data.roomId, userId, data.content);

    // Broadcast to all users in the room
    this.server.to(`room:${data.roomId}`).emit(SOCKET_EVENTS.MESSAGE_RECEIVE, message);

    return { success: true, message };
  }

  @SubscribeMessage(SOCKET_EVENTS.TYPING_START)
  async handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string }
  ) {
    const userId = client.data.userId;
    await this.chatService.setTyping(data.roomId, userId, true);

    client.to(`room:${data.roomId}`).emit(SOCKET_EVENTS.TYPING_START, {
      userId,
      roomId: data.roomId,
    });

    return { success: true };
  }

  @SubscribeMessage(SOCKET_EVENTS.TYPING_STOP)
  async handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string }
  ) {
    const userId = client.data.userId;
    await this.chatService.setTyping(data.roomId, userId, false);

    client.to(`room:${data.roomId}`).emit(SOCKET_EVENTS.TYPING_STOP, {
      userId,
      roomId: data.roomId,
    });

    return { success: true };
  }
}
