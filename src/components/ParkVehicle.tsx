'use client';

import { useState } from 'react';
import { parkVehicle } from '@/lib/parkingLogic';

interface ParkVehicleProps {
    onVehicleParked: () => void;
    onMessage: (message: string, isError: boolean) => void;
}

export default function ParkVehicle({ onVehicleParked, onMessage }: ParkVehicleProps) {
    const [needsEV, setNeedsEV] = useState(false);
    const [needsCover, setNeedsCover] = useState(false);
    const [isParking, setIsParking] = useState(false);

    const handlePark = () => {
        setIsParking(true);

        const result = parkVehicle(needsEV, needsCover);

        if (result.success) {
            onMessage(result.message, false);
            // Reset selections
            setNeedsEV(false);
            setNeedsCover(false);
            onVehicleParked();
        } else {
            onMessage(result.message, true);
        }

        setIsParking(false);
    };

    return (
        <div className="glass-card">
            <div className="section-header">
                <h2 className="section-title">Park Vehicle</h2>
                <p className="section-subtitle">Select vehicle requirements and find the nearest available slot</p>
            </div>

            <div className="grid grid-2 mb-lg">
                <label className="form-checkbox-group">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={needsEV}
                        onChange={(e) => setNeedsEV(e.target.checked)}
                    />
                    <span className="form-checkbox-label">
                        ⚡ Needs EV Charging
                    </span>
                </label>

                <label className="form-checkbox-group">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={needsCover}
                        onChange={(e) => setNeedsCover(e.target.checked)}
                    />
                    <span className="form-checkbox-label">
                        🏠 Needs Cover
                    </span>
                </label>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <strong>Requirements:</strong> {!needsEV && !needsCover && 'Any available slot'}
                {needsEV && !needsCover && 'EV charging slot'}
                {!needsEV && needsCover && 'Covered slot'}
                {needsEV && needsCover && 'Covered slot with EV charging'}
            </div>

            <button
                onClick={handlePark}
                className="btn btn-secondary"
                disabled={isParking}
            >
                {isParking ? '⏳ Parking...' : '🚗 Park Vehicle'}
            </button>
        </div>
    );
}
