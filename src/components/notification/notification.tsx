import React, { useEffect } from 'react';
import './styles.sass';
import useNotificationStore from '@/services/notificationStore';

export default function Notification() {
    const { newNotification } = useNotificationStore();

    useEffect(() => {
        const handleAnimationEnd = () => {
            const containerElement = document.querySelector('.container');
            if (containerElement) {
                containerElement.classList.add('hidden');
            }
        };

        const timerElement = document.querySelector('.timer');
        if (timerElement) {
            timerElement.addEventListener('animationend', handleAnimationEnd);

            return () => {
                timerElement.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, []);

    (newNotification.plate)

    return (
        <div className="container">
            <div className="text_box">
                <h3 className="plate_text">[{newNotification.plate.length > 0 ? newNotification.plate : "ABCD123"}]</h3>
                <p className="status_text">{newNotification.status.length > 0 ? newNotification.status : "Em Crise"}</p>
                <p className="status_date">{new Date(newNotification?.accidentDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' }) ?? new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' })}</p>
            </div>
            <div className="timer"></div>
        </div>
    );
}
