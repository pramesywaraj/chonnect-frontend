import { defineStore } from 'pinia';

export type NotificationType = 'error' | 'success' | 'info';
export enum NotificationTypeEnum {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info'
}

interface IPopMessageState {
  message: string | null;
  type: NotificationType | null;
  visible: boolean;
  timerId: number | null;
}

export const useNotificationStore = defineStore('notification', {
  state: (): IPopMessageState => ({
    message: null,
    type: null,
    visible: false,
    timerId: null
  }),
  actions: {
    showMessage(message: string, type: NotificationType = NotificationTypeEnum.INFO, duration = 2000) {
      this.message = message;
      this.type = type;
      this.visible = true;

      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      this.timerId = window.setTimeout(() => {
        this.hideMessage();
      }, duration);
    },
    hideMessage() {
      this.message = null;
      this.type = null;
      this.visible = false;

      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }
  }
});
