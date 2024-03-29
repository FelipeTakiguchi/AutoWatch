import React, { useState } from "react";
import Image from "../../../node_modules/next/image";
import notifyIcon from "@/assets/images/notify.svg";
import "./styles.sass";

export default function NotificationBox() {
    const [showNotifications, setShowNotifications] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);
  
    const expandNotifications = () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 500)
        if (showNotifications != 1)
            setShowNotifications(1);
    };

    const minimizeNotifications = (event: any) => {
        if (!event.target.closest('.notification_list'))
            setShowNotifications(2);
    }

    return (
        <div className="notification-box">
            <div
                className={`notification_icon_button ${isBlinking ? 'blink' : ''}`}
                onClick={expandNotifications}
            >
                <Image className="notify_icon" src={notifyIcon} alt="Notify Icon" />
            </div>
            <div className={`notification_list ${showNotifications == 1 ? "expanded" : showNotifications == 2 ? "minimized" : ""}`}>
                <div className="notification_header"><p className="notification_title">Notificações</p></div>
                <div className="notification_item">Notification 1</div>
                <div className="notification_item">Notification 2</div>
                <div className="notification_item">Notification 3</div>
                <div className="notification_footer"></div>
            </div>
            {showNotifications == 1 && (
                <div className="notifycation_overlay" onClick={(event) => minimizeNotifications(event)}>
                </div>
            )
            }
        </div>
    );
}
