import { createContext, useState, useEffect, useRef } from 'react';
export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    let nextId = 1;
    intervalRef.current = setInterval(() => {
      setNotifications(prev => [...prev, { id: nextId++, message: 'You have a new message', read: false }]);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const stopNotifications = () => clearInterval(intervalRef.current);
  const addNotification = message => setNotifications(prev => [...prev, { id: prev.length + 1, message, read: false }]);

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead, stopNotifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
