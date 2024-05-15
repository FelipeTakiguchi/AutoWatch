"use client";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import "./styles.sass";
import googleIcon from "../../assets/images/google_icon.png";
import React from "react";
import { signIn } from "next-auth/react";


export default function Login() {
    return (
        <div className="container">
            <Image className="logo" src={logo} alt="Logo Icon" />
            <button className="button" onClick={() => signIn('google')}>
                <Image className="google_icon" src={googleIcon} alt="google icon" />
                Sign In
            </button>
        </div>
    );
}
