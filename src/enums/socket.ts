export enum MESSAGE_SOCKET {
  NEW_MESSAGE = 'new_message',
  SEND_MESSAGE = 'send_message',
  TYPING = 'typing',
  STOP_TYPING = 'stop_typing'
}

export enum ROOM_SOCKET {
  ROOM_JOIN = 'room_join',
  ROOM_LEAVE = 'room_leave',
  ROOM_LAST_MESSAGE_UPDATE = 'room_last_message_update',
  ROOM_UPDATED = 'room_updated',
  USER_JOINED = 'user_joined',
  USER_LEFT = 'user_left'
}

export enum GENERAL_SOCKET {
  USER_SUBSCRIBE_TO_SERVER = 'user_subscribe_to_server',
  USER_UNSUBSCRIBE_FROM_SERVER = 'user_unsubscribe_from_server'
}
