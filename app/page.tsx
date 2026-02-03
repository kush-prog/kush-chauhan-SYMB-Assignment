'use client';

import { useState, useEffect } from 'react';
import { getAllSlots } from '@/lib/parkingLogic';
import { ParkingSlot } from '@/types/parking';
import AddSlotForm from '@/components/AddSlotForm';
import SlotList from '@/components/SlotList';
import ParkVehicle from '@/components/ParkVehicle';
import RemoveVehicle from '@/components/RemoveVehicle';
import OutputPanel from '@/components/OutputPanel';

export default function Home() {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Load slots on mount
  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = () => {
    setSlots(getAllSlots());
  };

  const handleMessage = (msg: string, error: boolean) => {
    setMessage(msg);
    setIsError(error);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🅿️</div>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          Smart Parking System
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
          Intelligent parking slot management with automatic allocation
        </p>
      </header>

      {/* Output Panel */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
        <OutputPanel message={message} isError={isError} />
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Management Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <AddSlotForm
            onSlotAdded={loadSlots}
            onMessage={handleMessage}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <ParkVehicle
              onVehicleParked={loadSlots}
              onMessage={handleMessage}
            />

            <RemoveVehicle
              onVehicleRemoved={loadSlots}
              onMessage={handleMessage}
              slots={slots}
            />
          </div>
        </div>

        {/* Slots Display */}
        <SlotList slots={slots} />
      </div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>Smart Parking Lot System | Built with Next.js & TypeScript</p>
      </footer>
    </div>
  );
}
