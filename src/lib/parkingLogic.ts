import { ParkingSlot, ParkingResult } from '@/types/parking';
import { loadSlots, saveSlots } from './storage';

/**
 * Get all parking slots
 */
export function getAllSlots(): ParkingSlot[] {
    return loadSlots();
}

/**
 * Validate if slot number is unique
 */
export function isSlotNumberUnique(slotNo: number, existingSlots?: ParkingSlot[]): boolean {
    const slots = existingSlots || loadSlots();
    return !slots.some(slot => slot.slotNo === slotNo);
}

/**
 * Add a new parking slot
 */
export function addSlot(
    slotNo: number,
    isCovered: boolean,
    isEVCharging: boolean
): ParkingResult {
    // Validate slot number
    if (!Number.isInteger(slotNo) || slotNo <= 0) {
        return {
            success: false,
            message: 'Slot number must be a positive integer'
        };
    }

    const slots = loadSlots();

    // Check for duplicate slot number
    if (!isSlotNumberUnique(slotNo, slots)) {
        return {
            success: false,
            message: `Slot ${slotNo} already exists`
        };
    }

    // Create new slot
    const newSlot: ParkingSlot = {
        slotNo,
        isCovered,
        isEVCharging,
        isOccupied: false
    };

    slots.push(newSlot);
    saveSlots(slots);

    return {
        success: true,
        message: `Slot ${slotNo} added successfully`,
        slotNo
    };
}

/**
 * CORE ALGORITHM: Park Vehicle
 * 
 * Logic:
 * 1. Filter slots where isOccupied === false
 * 2. If needsEV === true, filter slots where isEVCharging === true
 * 3. If needsCover === true, filter slots where isCovered === true
 * 4. From qualifying slots, select slot with LOWEST slot number (nearest)
 * 5. Mark selected slot as isOccupied = true
 * 6. Return success message with slot number
 * 7. If no slots qualify, return "No slot available"
 */
export function parkVehicle(needsEV: boolean, needsCover: boolean): ParkingResult {
    const slots = loadSlots();

    // Step 1: Filter available slots (not occupied)
    let availableSlots = slots.filter(slot => !slot.isOccupied);

    // Step 2: Filter by EV charging requirement
    if (needsEV) {
        availableSlots = availableSlots.filter(slot => slot.isEVCharging);
    }

    // Step 3: Filter by cover requirement
    if (needsCover) {
        availableSlots = availableSlots.filter(slot => slot.isCovered);
    }

    // Step 4: Check if any slots qualify
    if (availableSlots.length === 0) {
        return {
            success: false,
            message: 'No slot available'
        };
    }

    // Step 5: Select slot with lowest slot number (nearest)
    availableSlots.sort((a, b) => a.slotNo - b.slotNo);
    const selectedSlot = availableSlots[0];

    // Step 6: Mark slot as occupied
    const updatedSlots = slots.map(slot =>
        slot.slotNo === selectedSlot.slotNo
            ? { ...slot, isOccupied: true }
            : slot
    );

    saveSlots(updatedSlots);

    return {
        success: true,
        message: `Vehicle parked in Slot ${selectedSlot.slotNo}`,
        slotNo: selectedSlot.slotNo
    };
}

/**
 * Remove vehicle from a parking slot
 */
export function removeVehicle(slotNo: number): ParkingResult {
    const slots = loadSlots();
    const slot = slots.find(s => s.slotNo === slotNo);

    if (!slot) {
        return {
            success: false,
            message: `Slot ${slotNo} does not exist`
        };
    }

    if (!slot.isOccupied) {
        return {
            success: false,
            message: `Slot ${slotNo} is already empty`
        };
    }

    // Mark slot as available
    const updatedSlots = slots.map(s =>
        s.slotNo === slotNo
            ? { ...s, isOccupied: false }
            : s
    );

    saveSlots(updatedSlots);

    return {
        success: true,
        message: `Vehicle removed from Slot ${slotNo}`,
        slotNo
    };
}

/**
 * Get occupied slots only
 */
export function getOccupiedSlots(): ParkingSlot[] {
    return loadSlots().filter(slot => slot.isOccupied);
}
