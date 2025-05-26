import { useContext } from 'react'
import { NotificationContext } from './NotificationContext.jsx'
import './App.css'

export default function NotificationList() {
  const { notifications } = useContext(NotificationContext)
  return (
    <ul className="notification-list">
      {notifications.map(n => (
        <li key={n.id} className={n.read ? 'read' : 'unread'}>
          {n.message}
        </li>
      ))}
    </ul>
  )
}
