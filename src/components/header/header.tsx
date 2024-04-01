import Notification from "../notification/notification";
import NotificationBox from "../notificationBox/notificationBox";
import "./styles.sass"

export default function HeaderComponent() {
    return (
        <header className='header_container'>
            <div className="centralize_title">
                <h1 className="logo_title">AutoWatch</h1>
            </div>
            <NotificationBox/>
            <Notification/>
        </header>
    );
};
