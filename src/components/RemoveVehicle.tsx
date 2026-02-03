'use client';

import { useState } from 'react';
import { removeVehicle, getOccupiedSlots } from '@/lib/parkingLogic';
import { ParkingSlot } from '@/types/parking';

interface RemoveVehicleProps {
    onVehicleRemoved: () => void;
    onMessage: (message: string, isError: boolean) => void;
    slots: ParkingSlot[];
}

export default function RemoveVehicle({ onVehicleRemoved, onMessage, slots }: RemoveVehicleProps) {
    const [selectedSlot, setSelectedSlot] = useState('');
    const [isRemoving, setIsRemoving] = useState(false);

    const occupiedSlots = slots.filter(s => s.isOccupied).sort((a, b) => a.slotNo - b.slotNo);

    const handleRemove = () => {
        if (!selectedSlot) {
            onMessage('Please select a slot', true);
            return;
        }

        setIsRemoving(true);

        const slotNo = parseInt(selectedSlot);
        const result = removeVehicle(slotNo);

        if (result.success) {
            onMessage(result.message, false);
            setSelectedSlot('');
            onVehicleRemoved();
        } else {
            onMessage(result.message, true);
        }

        setIsRemoving(false);
    };

    return (
        <div className="glass-card">
            <div className="section-header">
                <h2 className="section-title">Remove Vehicle</h2>
                <p className="section-subtitle">Free up a parking slot by removing a vehicle</p>
            </div>

            {occupiedSlots.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚫</div>
                    <p>No occupied slots available</p>
                </div>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="slotSelect" className="form-label">
                            Select Occupied Slot
                        </label>
                        <select
                            id="slotSelect"
                            className="form-input"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="">-- Choose a slot --</option>
                            {occupiedSlots.map((slot) => (
                                <option key={slot.slotNo} value={slot.slotNo}>
                                    Slot #{slot.slotNo}
                                    {slot.isCovered ? ' 🏠' : ''}
                                    {slot.isEVCharging ? ' ⚡' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleRemove}
                        className="btn btn-success"
                        disabled={isRemoving || !selectedSlot}
                    >
                        {isRemoving ? '⏳ Removing...' : '✅ Remove Vehicle'}
                    </button>
                </>
            )}
        </div>
    );
}
