'use client';

import { ParkingSlot } from '@/types/parking';

interface SlotListProps {
    slots: ParkingSlot[];
}

export default function SlotList({ slots }: SlotListProps) {
    if (slots.length === 0) {
        return (
            <div className="glass-card text-center">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🅿️</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Parking Slots</h3>
                <p className="text-muted">Add your first parking slot to get started</p>
            </div>
        );
    }

    // Sort slots by slot number
    const sortedSlots = [...slots].sort((a, b) => a.slotNo - b.slotNo);

    return (
        <div className="glass-card">
            <div className="section-header">
                <h2 className="section-title">All Parking Slots</h2>
                <p className="section-subtitle">
                    Total: {slots.length} | Available: {slots.filter(s => !s.isOccupied).length} | Occupied: {slots.filter(s => s.isOccupied).length}
                </p>
            </div>

            <div className="grid grid-3">
                {sortedSlots.map((slot) => (
                    <div
                        key={slot.slotNo}
                        className={`slot-card ${slot.isOccupied ? 'occupied' : 'available'}`}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-light)' }}>
                                #{slot.slotNo}
                            </div>
                            <span className={`badge ${slot.isOccupied ? 'badge-error' : 'badge-success'}`}>
                                {slot.isOccupied ? '🚗 Occupied' : '✅ Available'}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ opacity: slot.isCovered ? 1 : 0.4 }}>
                                    {slot.isCovered ? '🏠' : '🌤️'}
                                </span>
                                <span style={{ color: slot.isCovered ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                                    {slot.isCovered ? 'Covered' : 'Not Covered'}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ opacity: slot.isEVCharging ? 1 : 0.4 }}>
                                    {slot.isEVCharging ? '⚡' : '🔌'}
                                </span>
                                <span style={{ color: slot.isEVCharging ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                                    {slot.isEVCharging ? 'EV Charging' : 'No EV Charging'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
