'use client';

import { useState, useEffect } from 'react';
import ModalCookies from "@/app/components/modal-cookies";

export default function CookieModalClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const hasConsent = localStorage.getItem('cookieConsent');
        if (!hasConsent) {
            setIsModalOpen(true);
        }
    }, []);

    const handleConsent = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsModalOpen(false);
    };

    return (
        <ModalCookies isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="Cookies Consent">
            <p>We use cookies to improve your experience on our site.</p>
            <button onClick={handleConsent}>I Agree</button>
        </ModalCookies>
    );
}
