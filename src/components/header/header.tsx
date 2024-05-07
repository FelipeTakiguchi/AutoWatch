import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Notification from "../notification/notification";
import NotificationBox from "../notificationBox/notificationBox";
import "./styles.sass"
import Profile from "../profile/profile";

export default function HeaderComponent() {
    return (
        <header className='header_container'>
            <Profile/>
            <div className="centralize_title">
                <Image className="logo" src={logo} alt="Logo Icon" />
                <h1 className="logo_title">AutoWatch</h1>
            </div>
            <NotificationBox />
            <Notification />
        </header>
    );
};
