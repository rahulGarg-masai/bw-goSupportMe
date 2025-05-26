import './App.css'
import { useContext } from 'react'
import { NotificationContext } from './NotificationContext.jsx'
import NotificationList from './NotificationList.jsx'

function App() {
  const { markAllAsRead, stopNotifications } = useContext(NotificationContext)
  return (
    <div>
      <h1>Notifications</h1>
      <NotificationList />
      <div className="controls">
        <button onClick={markAllAsRead}>Mark All as Read</button>
        <button onClick={stopNotifications}>Stop Notifications</button>
      </div>
    </div>
  )
}

export default App
