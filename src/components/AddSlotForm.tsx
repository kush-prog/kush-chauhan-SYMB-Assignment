'use client';

import { useState } from 'react';
import { addSlot } from '@/lib/parkingLogic';

interface AddSlotFormProps {
    onSlotAdded: () => void;
    onMessage: (message: string, isError: boolean) => void;
}

export default function AddSlotForm({ onSlotAdded, onMessage }: AddSlotFormProps) {
    const [slotNo, setSlotNo] = useState('');
    const [isCovered, setIsCovered] = useState(false);
    const [isEVCharging, setIsEVCharging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const slotNumber = parseInt(slotNo);

        if (isNaN(slotNumber) || slotNumber <= 0) {
            onMessage('Please enter a valid slot number', true);
            setIsSubmitting(false);
            return;
        }

        const result = addSlot(slotNumber, isCovered, isEVCharging);

        if (result.success) {
            onMessage(result.message, false);
            // Reset form
            setSlotNo('');
            setIsCovered(false);
            setIsEVCharging(false);
            onSlotAdded();
        } else {
            onMessage(result.message, true);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="glass-card">
            <div className="section-header">
                <h2 className="section-title">Add Parking Slot</h2>
                <p className="section-subtitle">Create a new parking slot in the system</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="slotNo" className="form-label">
                        Slot Number *
                    </label>
                    <input
                        id="slotNo"
                        type="number"
                        className="form-input"
                        value={slotNo}
                        onChange={(e) => setSlotNo(e.target.value)}
                        placeholder="Enter slot number (e.g., 1, 2, 3...)"
                        required
                        min="1"
                    />
                </div>

                <div className="grid grid-2 mb-lg">
                    <label className="form-checkbox-group">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={isCovered}
                            onChange={(e) => setIsCovered(e.target.checked)}
                        />
                        <span className="form-checkbox-label">
                            🏠 Covered Parking
                        </span>
                    </label>

                    <label className="form-checkbox-group">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={isEVCharging}
                            onChange={(e) => setIsEVCharging(e.target.checked)}
                        />
                        <span className="form-checkbox-label">
                            ⚡ EV Charging Available
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '⏳ Adding...' : '➕ Add Slot'}
                </button>
            </form>
        </div>
    );
}
