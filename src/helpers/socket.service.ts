import { type Socket, io } from 'socket.io-client';

import { NotificationTypeEnum, useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';
import { env } from '@/constants/env';
import { MESSAGE_SOCKET, ROOM_SOCKET } from '@/enums/socket';
import type { Message } from '@/types/message';
import type { Room } from '@/types/room';
import { ref } from 'vue';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private _isConnected = ref(false);

  private get userStore() {
    return useUserStore();
  }

  private get notificationStore() {
    return useNotificationStore();
  }

  connect() {
    if (this.socket?.connected) return;

    const accessToken = this.userStore.accessToken;
    if (!accessToken) {
      this.notificationStore.showMessage('No access token available for socket connection', NotificationTypeEnum.ERROR);
      return;
    }

    this.socket = io(env.VITE_SOCKET_URL, {
      auth: {
        token: accessToken
      },
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id, this.socket?.connected);
      this._isConnected.value = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', reason => {
      console.log('Socket disconnected:', reason);

      this._isConnected.value = false;

      if (reason === 'io server disconnect') {
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', error => {
      console.error('Socket connection error:', error);
      this._isConnected.value = false;
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    this.socket.on('reconnect', attemptNumber => {
      console.log('Socket reconnected after', attemptNumber, 'attempts');
      this._isConnected.value = true;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    console.log(`Joining room: ${roomId}`);
    this.socket.emit(ROOM_SOCKET.ROOM_JOIN, roomId);
  }

  leaveRoom(roomId: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit(ROOM_SOCKET.ROOM_LEAVE, roomId);
  }

  // Probably not used
  sendMessage(roomId: string, content: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit(MESSAGE_SOCKET.SEND_MESSAGE, { room_id: roomId, content });
  }

  onMessage(callback: (message: Message) => void) {
    if (!this.socket) return;
    this.socket.on(MESSAGE_SOCKET.NEW_MESSAGE, callback);
  }

  onRoomLastMessageUpdate(callback: (room: Room) => void) {
    if (!this.socket) return;
    this.socket.on(ROOM_SOCKET.ROOM_LAST_MESSAGE_UPDATE, callback);
  }

  // Utility methods
  off(event: string) {
    if (!this.socket) return;
    this.socket.off(event);
  }

  isConnected(): boolean {
    return this._isConnected.value;
  }

  getSocketId(): string | undefined {
    return this.socket?.id;
  }

  get connectionState() {
    return this._isConnected;
  }
}

export const socketService = new SocketService();
