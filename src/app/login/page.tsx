"use client"
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import "./styles.sass";
import googleIcon from "../../assets/images/google_icon.png";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
    const { data: session, status } = useSession();

    useEffect(() => {
        // When the session status changes to "authenticated", log the user data
        if (status === "authenticated") {
            // console.log(session.user);
            window.location.href = "http://localhost:3000";
        }

    }, [session, status]);

    const signInRedirect = () => {
        if (status !== "authenticated") {
            // Otherwise, initiate the Google sign-in flow
            signIn('google');
        }
    }

    return (
        <div className="container">
            <Image className="logo" src={logo} alt="Logo Icon" />
            <button className="button" onClick={() => signInRedirect()}>
                <Image className="google_icon" src={googleIcon} alt="google icon" />
                Sign In
            </button>
        </div>
    );
}
