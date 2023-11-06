import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";

export function UserInbox() {
  const [inboxType, setInboxType] = useState("messages");

  const messages = [
    {
      id: 1,
      icon: "https://i.ibb.co/jDy9rL4/user.png",
      name: "John Doe",
      title: "Hello there!",
      date: "2023-11-06",
    },
    {
      id: 2,
      icon: "https://i.ibb.co/jDy9rL4/user.png",
      name: "Alice Smith",
      title: "How are you doing?",
      date: "2023-11-07",
    },
    {
      id: 3,
      icon: "https://i.ibb.co/jDy9rL4/user.png",
      name: "Bob Johnson",
      title: "Meeting tomorrow?",
      date: "2023-11-08",
    },
    {
      id: 4,
      icon: "https://i.ibb.co/jDy9rL4/user.png",
      name: "Eve Anderson",
      title: "New project update",
      date: "2023-11-09",
    },
    {
      id: 5,
      icon: "https://i.ibb.co/jDy9rL4/user.png",
      name: "Charlie Brown",
      title: "Lunch plans?",
      date: "2023-11-10",
    },
  ];

  const notifications = [
    {
      id: 1,
      isRead: true,
      title: "Your order has shipped!",
      date: "2023-11-06",
    },
    {
      id: 2,
      isRead: false,
      title: "Jeck sent you a message",
      date: "2023-11-07",
    },
    {
      id: 3,
      isRead: false,
      title: "Last day to submit your project",
      date: "2023-11-08",
    },
    {
      id: 4,
      isRead: true,
      title: "New project update",
      date: "2023-11-09",
    },
    {
      id: 5,
      isRead: false,
      title: "Lunch plans?",
      date: "2023-11-10",
    },
  ];

  return (
    <div className="inbox">
      <h1>Inbox</h1>
      <div className="inbox-tabs">
        <button
          className={inboxType === "messages" ? "active" : ""}
          onClick={() => setInboxType("messages")}
        >
          Messages
        </button>
        <button
          className={inboxType === "notifications" ? "active" : ""}
          onClick={() => setInboxType("notifications")}
        >
          Notifications
        </button>
      </div>

      <div className="chat-list">
        {/* MESSAGES */}
        {inboxType === "messages" &&
          messages.map((message) => (
            <div className="chat-item" key={message.id}>
              <img src={message.icon} alt={`${message.name}'s icon`} />
              <div className="chat-content">
                <div className="chat-header">
                  <span className="chat-name">{message.name}</span>
                  <span className="chat-date">{message.date}</span>
                </div>
                <div className="chat-title">{message.title}</div>
              </div>
            </div>
          ))}
        {/* NOTIFICATION */}
        {inboxType === "notifications" &&
          notifications.map((notifications) => (
            <div className="notification-item" key={notifications.id}>
              <div
                className={`notification-icon ${
                  notifications.isRead ? "" : "unread"
                }`}
              >
                <div className="notification-dot" />
                <IoMdNotifications />
              </div>
              <div className="notification-content">
                <div className="notification-title">{notifications.title}</div>
                <div className="notification-date">{notifications.date}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
