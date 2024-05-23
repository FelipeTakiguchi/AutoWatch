import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Notification from "../notification/notification";
import NotificationBox from "../notificationBox/notificationBox";
import "./styles.sass"
import Profile from "../profile/profile";
import useNotificationStore from "@/services/notificationStore";
import { useEffect, useState } from "react";
import useClientStore from "@/services/clientStore";

export default function HeaderComponent() {
    const { newNotification } = useNotificationStore();
    const [showNotify, setShowNotify] = useState(false);
    const [key, setKey] = useState(0); // Key to force remount

    useEffect(() => {
        // console.log(newNotification)
        if(newNotification.plate && newNotification.status)
            setShowNotify(true);

        // Update the key to force remount of Notification component
        setKey(prevKey => prevKey + 1);
    }, [newNotification]);

    return (
        <header className='header_container'>
            <Profile />
            <div className="centralize_title">
                <Image className="logo" src={logo} alt="Logo Icon" />
                <h1 className="logo_title">AutoWatch</h1>
            </div>
            <NotificationBox />

            {
                showNotify &&
                <Notification key={key} /> // Add key prop
            }
        </header>
    );
};
