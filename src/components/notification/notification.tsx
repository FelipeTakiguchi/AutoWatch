import React, { useEffect } from 'react';
import './styles.sass';

export default function Notification() {
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

    return (
        <div className="container">
            <div className="text_box">
                <h3 className="plate_text">[ABC1234]</h3>
                <p className="status_text">Rodando</p>
            </div>
            <div className="timer"></div>
        </div>
    );
}
