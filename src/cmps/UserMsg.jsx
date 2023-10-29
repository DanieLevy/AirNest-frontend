import { eventBus, showSuccessMsg } from "../services/event-bus.service.js";
import { useState, useEffect, useRef } from "react";
import {
  socketService,
  SOCKET_EVENT_REVIEW_ABOUT_YOU,
} from "../services/socket.service.js";
import { IoCheckmark, IoClose, IoCloseOutline } from "react-icons/io5";

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <div className={`alert ${msg.type}`}>
      <div className={`icon`}>
        {msg.type === "success" && (
          <span className={`${msg.type}`}>
            <IoCheckmark />
          </span>
        )}
        {msg.type === "error" && (
          <span className={`${msg.type}`}>
            <IoClose />
          </span>
        )}
      </div>
      <div>
        <h3 className="alert-text">{msg.txt}</h3>
      </div>
      <button className="close" onClick={closeMsg}>
        <span>
          <IoCloseOutline />
        </span>
      </button>
    </div>
  )
}
