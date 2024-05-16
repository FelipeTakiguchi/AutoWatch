"use client"
import "./styles.sass";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Profile() {
    const { data: session } = useSession();
    const [showOptions, setShowOptions] = useState(0);

    const expandOptions = () => {
        if (showOptions != 1)
            setShowOptions(1);
    };

    const minimizeOptions = (event: any) => {
        if (!event.target.closest('.profile_list'))
            setShowOptions(2);
    }
    
    return (
        <div className="profile_box">
            <button className="profile_button_image" onClick={expandOptions}>
                <img src={session?.user?.image ?? ""} className="profile_image"></img>
            </button>
            <div className={`profile_list ${showOptions == 1 ? "expanded" : showOptions == 2 ? "minimized" : ""}`}>
                <p className="profile_name">{session?.user?.name}</p>
                <button className="exit_button" onClick={() => signOut()}>
                    <p className="profile_name">Sair</p>
                </button>
            </div>
            {
                showOptions == 1 && (
                    <div className="profile_overlay" onClick={(event) => minimizeOptions(event)}>
                    </div>
                )
            }
        </div>
    );
}