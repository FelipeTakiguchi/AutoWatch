import React, { useState } from "react";
import Image from "../../../node_modules/next/image";
import notifyIcon from "@/assets/images/notify.svg";
import "./styles.sass";

export default function NotificationBox() {
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <div className="notification-box">
            <div className="notification_icon_button" onClick={toggleNotifications}>
                <Image className="notify_icon" src={notifyIcon} alt="Notify Icon" />
            </div>
            <div className={`notification_list ${showNotifications ? "expanded" : ""}`}>
                <div className="notification_header"><p className="notification_title">Notificações</p></div>
                <div className="notification_item">Notification 1</div>
                <div className="notification_item">Notification 2</div>
                <div className="notification_item">Notification 3</div>
                <div className="notification_footer"></div>
            </div>
        </div>
    );
}
