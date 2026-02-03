'use client';

import { useEffect, useState } from 'react';

interface OutputPanelProps {
    message: string;
    isError: boolean;
}

export default function OutputPanel({ message, isError }: OutputPanelProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
        }
    }, [message]);

    if (!message || !visible) {
        return null;
    }

    return (
        <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>
            <span style={{ fontSize: '1.5rem' }}>
                {isError ? '❌' : '✅'}
            </span>
            <span>{message}</span>
        </div>
    );
}
