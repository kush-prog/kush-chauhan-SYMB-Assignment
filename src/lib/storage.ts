import { ParkingSlot } from '@/types/parking';

const STORAGE_KEY = 'parking_slots';

/**
 * Load all parking slots from local storage
 */
export function loadSlots(): ParkingSlot[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading slots:', error);
        return [];
    }
}

/**
 * Save parking slots to local storage
 */
export function saveSlots(slots: ParkingSlot[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    } catch (error) {
        console.error('Error saving slots:', error);
    }
}

/**
 * Clear all parking slots from storage
 */
export function clearSlots(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}
