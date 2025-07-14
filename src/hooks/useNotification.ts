import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Notification, NotificationRequest } from "@/types/notification";

export function useNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const clientRef = useRef<Client | null>(null);
  const router = useRouter();
  const member = useAuthStore((state) => state.member);

  useEffect(() => {
    if (!member || clientRef.current) return;

    const stompClient = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
      webSocketFactory: () =>
        new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!),
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/notifications/${member.id}`, (message) => {
          console.log(
            "subscribed to notifications: ",
            `notifications/${member.id}`
          );
          console.log("message from server: ", message);
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [...prev, notification]);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (error) => {
        console.error("Stomp error", error);
      },
    });

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [member]);

  // 모든 알림(like, comment, follow, mention) /noti.add 경로로 전송
  // NotificationRequest : action(enum), referenceType, referenceId, commentId
  const sendNotification = (notificationRequest: NotificationRequest) => {
    if (clientRef.current) {
      clientRef.current.publish({
        destination: `/app/noti.add`,
        body: JSON.stringify(notificationRequest),
      });
    }
  };

  // 알림 클릭 시 알림 읽음 처리 및 링크 이동
  const handleNotificationClick = (id: string, link: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    setIsOpen(false);
    if (clientRef.current) {
      clientRef.current.publish({
        destination: `/app/noti.read`,
        body: JSON.stringify({ ids: [id] }),
      });
    }
    router.push(link);
  };

  const markAllAsRead = () => {
    const notificationIds = notifications.map((n) => n.id);
    setNotifications([]);
    if (clientRef.current) {
      clientRef.current.publish({
        destination: `/app/noti.read`,
        body: JSON.stringify({ ids: notificationIds }),
      });
    }
  };

  return {
    isOpen,
    setIsOpen,
    notifications,
    handleNotificationClick,
    markAllAsRead,
    sendNotification,
  };
}
