// app/utils/notifications.ts
interface Notification {
  type: string;
  title: string;
  message: string;
  data?: any;
}

export async function sendNotification(notification: Notification) {
  // Log to console
  console.log('\n📬 Nueva Notificación:', {
    title: notification.title,
    message: notification.message,
    data: notification.data,
  });

  // Here you could add additional notification methods:
  // - Email notifications
  // - Push notifications
  // - Slack/Discord webhooks
  // - SMS notifications
}
